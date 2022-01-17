import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@app/projects/entities/project.entity';
import { Repository } from 'typeorm';
import { User } from '@app/users/entities/user.entity';
import { ProjectResponseInterface } from '@app/projects/types/projectResponse.interface';
import * as moment from 'moment';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) public repo: Repository<Project>) {}

  buildProjectResponse(project: Project): ProjectResponseInterface {
    return {
      ...project,
      owner: {
        id: project.owner.id,
        username: project.owner.username,
        email: project.owner.email,
        name: project.owner.name,
        surname: project.owner.surname,
        phone: project.owner.phone,
        image: project.owner.image,
      },
    };
  }

  setProjectDir(title: string) {
    const data = moment().format('YYYY.MM.DD');
    return title.replace(/ /g, '-') + '_' + data;
  }

  async getHomeDir(dto: UpdateProjectDto, id?: number) {
    const homeDir = this.setProjectDir(dto.title);
    const candidate = await this.repo.findOne({ homeDir });
    const data = homeDir.split('_').pop();
    if (candidate && candidate.id == id) return homeDir;
    if (candidate)
      throw new HttpException(
        `Проект с названием '${dto.title}' и датой '${data}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return homeDir;
  }

  // Создать новый проект
  async create(user: User, createProjectDto: CreateProjectDto): Promise<Project> {
    const homeDir = await this.getHomeDir(createProjectDto);
    if (homeDir) {
      const project = await this.repo.create(createProjectDto);
      project.homeDir = homeDir;
      project.owner = user;
      return await this.repo.save(project);
    }
  }

  // Получить все проекты
  async getAll(): Promise<Project[]> {
    // return await this.repo.find({ relations: ['owner'] });
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
    const homeDir = await this.getHomeDir(updateProjectDto, id);

    if (homeDir) {
      Object.assign(project, updateProjectDto);
      project.homeDir = homeDir;
      return this.repo.save(project);
    }
  }

  // Удалить проект по ID
  async remove(id: number): Promise<Project> {
    const project = await this.getById(id);
    return this.repo.remove(project);
  }
}
