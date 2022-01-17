import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@app/projects/entities/project.entity';
import { Repository } from 'typeorm';
import { IsTakenField } from '@app/utils/isTakenField';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) public repo: Repository<Project>) {}

  // Создать новый проект
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    // await IsTakenField(this.repo, 'name', createProjectDto, Project.name);
    const project = this.repo.create(createProjectDto);
    return await this.repo.save(project);
  }

  // Получить все проекты
  async getAll(): Promise<Project[]> {
    return await this.repo.find();
  }

  // Получить проект по ID
  async getById(id: number): Promise<Project | null> {
    const project = await this.repo.findOne(id);
    if (!project) throw new HttpException(`Проект с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return project;
  }

  // Изменить проект по ID
  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.getById(id);
    await IsTakenField(this.repo, 'name', updateProjectDto, Project.name, id);
    Object.assign(project, updateProjectDto);
    return this.repo.save(project);
  }

  // Удалить проект по ID
  async remove(id: number): Promise<Project> {
    const project = await this.getById(id);
    return this.repo.remove(project);
  }
}
