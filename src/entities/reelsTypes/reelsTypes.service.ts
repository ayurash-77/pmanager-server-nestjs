import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReelsTypeDto } from './dto/create-reelsType.dto';
import { UpdateReelsTypeDto } from './dto/update-reelsType.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';
import { StatusesService } from '@app/entities/statuses/statuses.service';

@Injectable()
export class ReelsTypesService {
  constructor(
    @InjectRepository(ReelsType) public reelsTypesRepo: Repository<ReelsType>,
    private statusesService: StatusesService,
  ) {}

  // Создать новый тип ролика
  async create(user: User, dto: CreateReelsTypeDto): Promise<ReelsType> {
    const candidate = await this.reelsTypesRepo.findOne({
      where: { projectId: dto.projectId, code: dto.code },
    });
    if (candidate) {
      throw new HttpException(
        `Тип ролика проекта с ID: '${dto.projectId}' и code: '${dto.code}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const reelsType = this.reelsTypesRepo.create(dto);
    reelsType.createdBy = user;
    reelsType.status = await this.statusesService.getByCode(1);

    return await this.reelsTypesRepo.save(reelsType);
  }

  // Получить все типы роликов
  async getAll(): Promise<ReelsType[]> {
    return await this.reelsTypesRepo.find({ order: { code: 'ASC' } });
  }

  // Получить все типы роликав проека
  async getAllByProjectId(projectId: number): Promise<ReelsType[] | null> {
    if (!projectId) return null;
    const reelsTypes = await this.reelsTypesRepo.find({
      where: { projectId: projectId },
      relations: ['reels'],
      order: { code: 'ASC' },
    });
    if (!reelsTypes) return [];
    return reelsTypes;
  }

  // Получить тип ролика по ID
  async getById(id: number): Promise<ReelsType | null> {
    const reel = await this.reelsTypesRepo.findOne(id);
    if (!reel) throw new HttpException(`Тип ролика с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return reel;
  }

  // Изменить тип ролика по ID
  async update(id: number, updateReelsTypeDto: UpdateReelsTypeDto): Promise<ReelsType> {
    const reel = await this.getById(id);
    Object.assign(reel, updateReelsTypeDto);
    return this.reelsTypesRepo.save(reel);
  }

  // Удалить тип ролика по ID
  async remove(id: number): Promise<ReelsType> {
    const reel = await this.getById(id);
    return this.reelsTypesRepo.remove(reel);
  }
}
