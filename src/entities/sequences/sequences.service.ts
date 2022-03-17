import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sequence } from '@app/entities/sequences/sequence.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';

@Injectable()
export class SequencesService {
  constructor(@InjectRepository(Sequence) public sequencesRepo: Repository<Sequence>) {}

  // Создать новый хронометраж
  async create(user: User, createSequenceDto: CreateSequenceDto): Promise<Sequence> {
    const sequence = this.sequencesRepo.create(createSequenceDto);
    sequence.createdBy = user;
    return await this.sequencesRepo.save(sequence);
  }

  // Получить все хронометражи
  async getAll(projectId?: number): Promise<Sequence[]> {
    if (projectId) return await this.sequencesRepo.find({ where: { projectId } });
    return await this.sequencesRepo.find();
  }

  // Получить все хронометражи проекта
  async getAllByProjectId(id: number): Promise<Sequence[]> {
    return await this.sequencesRepo.find({ where: { projectId: id } });
  }

  // Получить хронометраж по ID
  async getById(id: number): Promise<Sequence | null> {
    const sequence = await this.sequencesRepo.findOne(id);
    if (!sequence) throw new HttpException(`Хронометраж с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return sequence;
  }

  // Изменить хронометраж по ID
  async update(id: number, updateSequenceDto: UpdateSequenceDto): Promise<Sequence> {
    const sequence = await this.getById(id);
    // await IsTakenField(this.sequencesRepo, 'name', updateSequenceDto, Sequence.name, id);
    Object.assign(sequence, updateSequenceDto);
    return this.sequencesRepo.save(sequence);
  }

  // Удалить хронометраж по ID
  async remove(id: number): Promise<Sequence> {
    const sequence = await this.getById(id);
    return this.sequencesRepo.remove(sequence);
  }
}
