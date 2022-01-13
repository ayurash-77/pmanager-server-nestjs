import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '@app/jobs/entities/job.entity';
import { CreateJobDto } from '@app/jobs/dto/create-job.dto';
import { IsTakenField } from '@app/utils/isTakenField';
import { UpdateJobDto } from '@app/jobs/dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) public repo: Repository<Job>) {}

  // Создать новый тип работ
  async create(createJobDto: CreateJobDto): Promise<Job> {
    await IsTakenField(this.repo, 'name', createJobDto, Job.name);
    const job = this.repo.create(createJobDto);
    return await this.repo.save(job);
  }

  // Получить все типы работ
  async getAll(): Promise<Job[]> {
    return await this.repo.find();
  }

  // Получить тип работ по ID
  async getById(id: number): Promise<Job | null> {
    const job = await this.repo.findOne(id);
    if (!job) throw new HttpException(`Тип работ с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return job;
  }

  // Изменить тип работ по ID
  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.getById(id);
    await IsTakenField(this.repo, 'name', updateJobDto, Job.name, id);
    Object.assign(job, updateJobDto);
    return this.repo.save(job);
  }

  // Удалить тип работ по ID
  async remove(id: number): Promise<Job> {
    const job = await this.getById(id);
    return this.repo.remove(job);
  }
}
