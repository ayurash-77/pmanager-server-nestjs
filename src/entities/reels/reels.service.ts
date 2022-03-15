import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReelDto } from './dto/create-reel.dto';
import { UpdateReelDto } from './dto/update-reel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reel } from '@app/entities/reels/reel.entity';
import { Repository } from 'typeorm';
import { IsTakenField } from '@app/utils/isTakenField';
import { User } from '@app/entities/users/user.entity';

@Injectable()
export class ReelsService {
  constructor(@InjectRepository(Reel) public reelsRepo: Repository<Reel>) {}

  // Создать новый ролик
  async create(user: User, createReelDto: CreateReelDto): Promise<Reel> {
    const reel = this.reelsRepo.create(createReelDto);
    reel.createdBy = user;
    return await this.reelsRepo.save(reel);
  }

  // Получить все ролики
  async getAll(): Promise<Reel[]> {
    return await this.reelsRepo.find();
  }

  // Получить ролик по ID
  async getById(id: number): Promise<Reel | null> {
    const reel = await this.reelsRepo.findOne(id);
    if (!reel) throw new HttpException(`Ролик с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return reel;
  }

  // Изменить ролик по ID
  async update(id: number, updateReelDto: UpdateReelDto): Promise<Reel> {
    const reel = await this.getById(id);
    // await IsTakenField(this.reelsRepo, 'name', updateReelDto, Reel.name, id);
    Object.assign(reel, updateReelDto);
    return this.reelsRepo.save(reel);
  }

  // Удалить ролик по ID
  async remove(id: number): Promise<Reel> {
    const reel = await this.getById(id);
    return this.reelsRepo.remove(reel);
  }
}
