import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReelsTypeDto } from './dto/create-reelsType.dto';
import { UpdateReelsTypeDto } from './dto/update-reelsType.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';

@Injectable()
export class ReelsTypesService {
  constructor(@InjectRepository(ReelsType) public reelsTypesRepo: Repository<ReelsType>) {}

  // Создать новый тип ролика
  async create(user: User, createReelsTypeDto: CreateReelsTypeDto): Promise<ReelsType> {
    const reel = this.reelsTypesRepo.create(createReelsTypeDto);
    reel.createdBy = user;
    return await this.reelsTypesRepo.save(reel);
  }

  // Получить все типы роликов
  async getAll(projectId?: number): Promise<ReelsType[]> {
    if (projectId) return await this.reelsTypesRepo.find({ where: { projectId } });
    return await this.reelsTypesRepo.find();
  }

  // Получить все типы роликаи проеков
  async getAllByProjectId(id: number): Promise<ReelsType[]> {
    return await this.reelsTypesRepo.find({ where: { projectId: id } });
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
