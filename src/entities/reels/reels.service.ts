import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReelDto } from './dto/create-reel.dto';
import { UpdateReelDto } from './dto/update-reel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reel } from '@app/entities/reels/reel.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';
import { ReelsTypesService } from '@app/entities/reelsTypes/reelsTypes.service';
import { ProjectsService } from '@app/entities/projects/projects.service';
import { StatusesService } from '@app/entities/statuses/statuses.service';
import { ShotsService } from '@app/entities/shots/shots.service';
import { Shot } from '@app/entities/shots/shot.entity';

@Injectable()
export class ReelsService {
  constructor(
    @InjectRepository(Reel) public reelsRepo: Repository<Reel>,
    @InjectRepository(Shot) public shotsRepo: Repository<Shot>,
    private reelsTypesService: ReelsTypesService,
    private projectsService: ProjectsService,
    private statusesService: StatusesService, // private shotsService: ShotsService,
  ) {}

  // Создать новый ролик
  async create(user: User, dto: CreateReelDto): Promise<Reel> {
    const project = await this.projectsService.getById(dto.projectId);
    const reelsType = await this.reelsTypesService.getById(dto.reelsTypeId);

    const durationStr = dto.duration.toString().padStart(2, '0');
    const code = `${reelsType.code}_${durationStr}s`;
    const name = `${reelsType.name} ${durationStr} sec`;

    const candidate = await this.reelsRepo.findOne({
      where: { projectId: dto.projectId, reelsTypeId: dto.reelsTypeId, duration: dto.duration },
    });

    if (candidate) {
      throw new HttpException(
        `Ролик '${reelsType.code} | ${reelsType.name}' c хронометражем: ${dto.duration} сек. уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const reel = await this.reelsRepo.create(dto);
    reel.createdBy = user;
    reel.code = code;
    reel.name = name;
    reel.project = project;
    reel.reelsType = reelsType;
    reel.status = await this.statusesService.getByCode(1);
    return await this.reelsRepo.save(reel);
  }

  // Получить все ролики
  async getAll(): Promise<Reel[]> {
    return await this.reelsRepo.find({ order: { code: 'ASC' } });
  }

  // Получить все ролики проекта
  async getAllByProjectId(projectId: number): Promise<Reel[] | null> {
    if (!projectId) return null;
    const reels = await this.reelsRepo.find({
      where: { projectId: projectId },
      order: { highPriority: 'DESC', code: 'ASC' },
      // order: { highPriority: 'DESC' },
      relations: ['reelsType'],
    });
    if (!reels) return [];
    return reels;
  }

  // Получить ролик по ID
  async getById(id: number): Promise<Reel | null> {
    const reel = await this.reelsRepo.findOne(id, { relations: ['reelsType'] });
    if (!reel) return null;
    return reel;
  }

  // Получить массив роликов по массиву ID
  async getByIds(ids: number[]): Promise<Reel[]> {
    if (ids) return await this.reelsRepo.findByIds(ids);
    return null;
  }

  // Добавить шот

  // async addShot(dto: UpdateReelDto): Promise<Reel> {
  //   const;
  // }

  // Изменить ролик по ID
  async update(id: number, dto: UpdateReelDto): Promise<Reel> {
    const reel = await this.getById(id);
    Object.assign(reel, dto);
    await this.reelsRepo.save(reel);
    const shots = await this.shotsRepo.findByIds(dto.shotsIds);
    if (!shots) return await this.reelsRepo.save(reel);
    reel.shots = shots;
    reel.shotsIds = dto.shotsIds;

    return await this.reelsRepo.save(reel);
  }

  // Удалить ролик по ID
  async remove(id: number): Promise<Reel> {
    const reel = await this.getById(id);
    return this.reelsRepo.remove(reel);
  }
}
