import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '@app/entities/jobs/job.entity';
import { CreateJobDto } from '@app/entities/jobs/dto/create-job.dto';
import { UpdateJobDto } from '@app/entities/jobs/dto/update-job.dto';
import { IsTakenField } from '@app/utils/isTakenField';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) public jobRepo: Repository<Job>) {}

  // Создать новый тип работ
  async create(dto: CreateJobDto): Promise<Job> {
    await IsTakenField(this.jobRepo, 'name', dto.name, Job.name);
    const job = this.jobRepo.create(dto);
    return await this.jobRepo.save(job);
  }

  // Получить все типы работ
  async getAll(): Promise<Job[]> {
    return await this.jobRepo.find();
  }

  // Получить тип работ по ID
  async getById(id: number): Promise<Job | null> {
    const job = await this.jobRepo.findOne(id);
    if (!job) throw new HttpException(`Тип работ с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return job;
  }

  // Изменить тип работ по ID
  async update(id: number, dto: UpdateJobDto): Promise<Job> {
    const job = await this.getById(id);
    await IsTakenField(this.jobRepo, 'name', dto.name, Job.name, id);
    Object.assign(job, dto);
    return this.jobRepo.save(job);
  }

  // Удалить тип работ по ID
  async remove(id: number): Promise<Job> {
    const job = await this.getById(id);
    return this.jobRepo.remove(job);
  }
}
