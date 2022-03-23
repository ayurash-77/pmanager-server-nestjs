import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReelDto } from './dto/create-reel.dto';
import { UpdateReelDto } from './dto/update-reel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reel } from '@app/entities/reels/reel.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';
import { ReelsTypesService } from '@app/entities/reelsTypes/reelsTypes.service';
import { ProjectsService } from '@app/entities/projects/projects.service';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';

@Injectable()
export class ReelsService {
  constructor(
    @InjectRepository(Reel) public reelsRepo: Repository<Reel>,
    private reelsTypesService: ReelsTypesService,
    private projectsService: ProjectsService,
  ) {}

  // Создать новый ролик
  async create(user: User, dto: CreateReelDto): Promise<Reel> {
    const project = await this.projectsService.getById(dto.projectId);
    const reelsType = await this.reelsTypesService.getById(dto.reelsTypeId);

    const durationStr = dto.duration.toString().padStart(2, '0');
    const code = `${reelsType.code}_${durationStr}s`;
    const name = `${reelsType.name} ${durationStr} sec`;

    const reel = await this.reelsRepo.create(dto);
    reel.createdBy = user;
    reel.code = code;
    reel.name = name;
    reel.project = project;
    reel.reelsType = reelsType;
    return await this.reelsRepo.save(reel);
  }

  // Получить все ролики
  async getAll(projectId?: number): Promise<Reel[]> {
    if (projectId) return await this.reelsRepo.find({ where: { projectId }, relations: ['reelsType'] });
    return await this.reelsRepo.find();
  }

  // Получить все ролики проекта
  async getAllByProjectId(id: number): Promise<Reel[]> {
    return await this.reelsRepo.find({ where: { projectId: id }, relations: ['reelsType'] });
  }

  // Получить ролик по ID
  async getById(id: number): Promise<Reel | null> {
    const reel = await this.reelsRepo.findOne(id, { relations: ['reelsType'] });
    if (!reel) throw new HttpException(`Ролик с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return reel;
  }

  // Изменить ролик по ID
  async update(id: number, updateSequenceDto: UpdateReelDto): Promise<Reel> {
    const reel = await this.getById(id);
    // await IsTakenField(this.reelsRepo, 'name', updateSequenceDto, Sequence.name, id);
    Object.assign(reel, updateSequenceDto);
    return this.reelsRepo.save(reel);
  }

  // Удалить ролик по ID
  async remove(id: number): Promise<Reel> {
    const reel = await this.getById(id);
    return this.reelsRepo.remove(reel);
  }
}
