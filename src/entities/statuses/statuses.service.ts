import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '@app/entities/statuses/status.entity';
import { Repository } from 'typeorm';
import { IsTakenField } from '@app/utils/isTakenField';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class StatusesService {
  constructor(@InjectRepository(Status) public statusRepo: Repository<Status>) {}

  // Создать новый статус
  async create(dto: CreateStatusDto): Promise<Status> {
    await IsTakenField(this.statusRepo, 'name', dto, Status.name);
    await IsTakenField(this.statusRepo, 'code', dto, Status.name);
    const status = await this.statusRepo.create(dto);
    return await this.statusRepo.save(status);
  }

  // Получить все статусы
  async getAll(): Promise<Status[]> {
    return this.statusRepo.find();
  }

  // Получить статус по ID
  async getById(id: number, options?: FindOneOptions): Promise<Status> {
    const status = await this.statusRepo.findOne(id, options);
    if (!status) throw new HttpException(`Статус с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return status;
  }

  // Получить статус по CODE
  async getByCode(code: number, options?: FindOneOptions): Promise<Status> {
    const status = await this.statusRepo.findOne({ code }, options);
    if (!status) throw new HttpException(`Статус с code=${code} не найден`, HttpStatus.NOT_FOUND);
    return status;
  }

  // Изменить статус по ID
  async update(id: number, dto: UpdateStatusDto) {
    const status = await this.getById(id);
    await IsTakenField(this.statusRepo, 'name', dto, Status.name, id);
    Object.assign(status, dto);
    return this.statusRepo.save(status);
  }

  // Удалить статус по ID
  async remove(id: number): Promise<Status> {
    const status = await this.getById(id);
    return this.statusRepo.remove(status);
  }
}
