import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@app/entities/roles/role.entity';
import { CreateRoleDto } from '@app/entities/roles/dto/create-role.dto';
import { UpdateRoleDto } from '@app/entities/roles/dto/update-role.dto';
import { IsTakenField } from '@app/utils/isTakenField';
import { AddJobDto } from '@app/entities/roles/dto/add-job.dto';
import { Job } from '@app/entities/jobs/job.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) public rolesRepo: Repository<Role>,
    @InjectRepository(Job) public jobsRepo: Repository<Role>,
  ) {}

  // Создать новую роль
  async create(dto: CreateRoleDto): Promise<Role> {
    await IsTakenField(this.rolesRepo, 'name', dto.name, Role.name);
    const role = this.rolesRepo.create(dto);
    return await this.rolesRepo.save(role);
  }

  // Получить все роли
  async getAll(): Promise<Role[]> {
    return await this.rolesRepo.find();
  }

  // Получить роль по ID
  async getById(id: number): Promise<Role | null> {
    const role = await this.rolesRepo.findOne(id, { relations: ['jobs'] });
    if (!role) throw new HttpException(`Роль с id=${id} не найдена`, HttpStatus.NOT_FOUND);
    return role;
  }

  // Изменить роль по ID
  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.getById(id);
    await IsTakenField(this.rolesRepo, 'name', dto.name, Role.name, id);
    Object.assign(role, dto);
    return this.rolesRepo.save(role);
  }

  // Удалить роль по ID
  async remove(id: number): Promise<Role> {
    const role = await this.getById(id);
    return this.rolesRepo.remove(role);
  }

  // Добавить тип рработ
  async addJob(dto: AddJobDto): Promise<Role> {
    const role = await this.getById(dto.roleId);
    const job = await this.jobsRepo.findOne(dto.jobId);
    if (!job) throw new HttpException('Тип работ с id=${id} не найден', HttpStatus.NOT_FOUND);

    const isNotExists = role.jobs.findIndex(jobInRole => jobInRole.id === job.id) === -1;
    if (isNotExists) {
      role.jobs.push(job);
      await this.rolesRepo.save(role);
    }
    return role;
  }

  // Удалить тип работ
  async removeJob(dto: AddJobDto): Promise<Role> {
    const role = await this.getById(dto.roleId);
    role.jobs = role.jobs.filter(jobInRole => jobInRole.id !== dto.jobId);
    await this.rolesRepo.save(role);
    return role;
  }
}
