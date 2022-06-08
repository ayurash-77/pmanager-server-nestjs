import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shot } from '@app/entities/shots/shot.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';
import { ProjectsService } from '@app/entities/projects/projects.service';
import { ReelsService } from '@app/entities/reels/reels.service';
import { IsTakenField } from '@app/utils/isTakenField';
import { Reel } from '@app/entities/reels/reel.entity';
import { StatusesService } from '@app/entities/statuses/statuses.service';

@Injectable()
export class ShotsService {
  constructor(
    @InjectRepository(Shot) public shotsRepo: Repository<Shot>,
    @InjectRepository(Reel) public reelsRepo: Repository<Reel>,
    private projectsService: ProjectsService,
    private reelsService: ReelsService,
    private statusesService: StatusesService,
  ) {}

  // Создать новый шот
  async create(user: User, dto: CreateShotDto): Promise<Shot> {
    const project = await this.projectsService.getById(dto.projectId);
    const reel = await this.reelsService.getById(dto.reelId);
    const reelsTypeCode = reel.reelsType.code;

    const code = `${reelsTypeCode}_${dto.number}`;
    const candidate = await this.shotsRepo.findOne({
      where: { projectId: dto.projectId, code: code },
    });

    if (candidate) {
      throw new HttpException(
        `Шот '${candidate.code}' в проекте '${project.title}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const shot = this.shotsRepo.create(dto);
    const isNotExists = reel.shots.findIndex(shotInReel => shotInReel.id === shot.id) === -1;

    shot.code = code;
    shot.createdBy = user;
    shot.project = project;
    shot.status = await this.statusesService.getByCode(1);
    await this.shotsRepo.save(shot);

    if (isNotExists) {
      reel.shots.push(shot);
      reel.shotsIds.push(shot.id);
      await this.reelsRepo.save(reel);
    }

    return shot;
  }

  // Получить все шоты
  async getAll(): Promise<Shot[]> {
    return await this.shotsRepo.find();
  }

  // Получить все шоты проекта
  async getAllByProjectId(projectId: number): Promise<Shot[] | null> {
    if (!projectId) return null;
    const shots = await this.shotsRepo.find({
      where: { projectId: projectId },
      order: { code: 'ASC' },
      relations: ['reels'],
    });
    if (!shots) return null;
    return shots;
  }

  // Получить все шоты ролика
  async getAllByReelId(reelId: number): Promise<Shot[] | null> {
    if (!reelId) return null;
    const reel = await this.reelsService.getById(reelId);
    if (!reel) return null;
    return reel.shots;
  }

  // Получить шот по ID
  async getById(id: number): Promise<Shot | null> {
    const shot = await this.shotsRepo.findOne(id, { relations: ['reels'] });
    if (!shot) throw new HttpException(`Шот с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return shot;
  }

  // Получить массив шотов по массиву ID
  async getByIds(ids: number[]): Promise<Shot[]> {
    if (ids) return await this.shotsRepo.findByIds(ids);
    return null;
  }

  // Изменить шот по ID
  async update(id: number, updateShotDto: UpdateShotDto): Promise<Shot> {
    const shot = await this.getById(id);
    // await IsTakenField(this.shotsRepo, 'name', updateShotDto, Shot.name, id);
    Object.assign(shot, updateShotDto);
    return this.shotsRepo.save(shot);
  }

  // Удалить шот по ID
  async remove(id: number): Promise<Shot> {
    const shot = await this.getById(id);

    shot.reels?.map(async reel => {
      const ids = reel.shotsIds;
      reel.shotsIds = ids.filter(id => id !== shot.id);
      await this.reelsRepo.save(reel);
    });

    return await this.shotsRepo.remove(shot);
  }
}
