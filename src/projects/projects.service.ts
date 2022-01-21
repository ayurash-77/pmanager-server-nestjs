import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@app/projects/project.entity';
import { Repository } from 'typeorm';
import { User } from '@app/users/user.entity';
import { ProjectResponseInterface } from '@app/projects/types/projectResponse.interface';
import { FilesService } from '@app/files/files.service';
import { format, getQuarter } from 'date-fns';
import { MoveFileDto } from '@app/files/dto/move-file.dto';
import { path as appPath } from 'app-root-path';
import { ProjectDateInterface } from '@app/projects/types/projectDate.interface';
import { RemoveProjectResponseInterface } from '@app/projects/types/removeProjectResponse.interface';
import * as fse from 'fs-extra';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) public projectsRepository: Repository<Project>,
    private filesService: FilesService,
  ) {}

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
        // briefs: project.briefs,
      },
    };
  }

  buildRemoveProjectResponse(project: Project): RemoveProjectResponseInterface {
    return { project, message: `Проект '${project.title}' успешно удален.` };
  }

  // Получить объект даты
  getProjectDate(date): ProjectDateInterface {
    const dateStr = format(date, 'yyyy.MM.dd');
    const year = date.getFullYear();
    const quarter = getQuarter(date);
    const yearQuarter = `${year}-${quarter}`;
    return { dateStr, year, quarter, yearQuarter };
  }

  // Получить домашншюю папку проекта
  async getHomeDir(dto: UpdateProjectDto, date) {
    const projectDate: ProjectDateInterface = this.getProjectDate(date);
    const newTitle = dto.title.replace(/ /g, '-');
    const homeDir = `${projectDate.yearQuarter}/${newTitle}_${projectDate.dateStr}`;

    const candidate = await this.projectsRepository.findOne({ homeDir });
    // if (candidate && candidate.id == id) return homeDir;
    if (candidate)
      throw new HttpException(
        `Проект с названием '${dto.title}' и датой '${projectDate.dateStr}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return homeDir;
  }

  // Создать новый проект
  async create(user: User, createProjectDto: CreateProjectDto): Promise<Project> {
    const homeDir = await this.getHomeDir(createProjectDto, new Date());

    if (homeDir) {
      const project = await this.projectsRepository.create(createProjectDto);
      project.homeDir = homeDir;

      await fse.ensureDir(`${process.env.WORK_ROOT}/${homeDir}`);
      await this.addProjectImage(project.homeDir, createProjectDto.image);

      project.owner = user;
      return await this.projectsRepository.save(project);
    }
  }

  // Добавить (из UPLOAD) изображение проекта если существует
  async addProjectImage(homeDir, imagePath) {
    if (homeDir && imagePath) {
      const moveFileDto: MoveFileDto = {
        srcPath: `${appPath}/${imagePath}`,
        dstPath: `${process.env.WORK_ROOT}/${homeDir}/.pmdata/projectThumbnail.jpg`,
      };
      await this.filesService.moveFile(moveFileDto);
    }
  }

  // Получить все проекты
  async getAll(): Promise<Project[]> {
    // return await this.projectsRepository.find({ relations: ['owner'] });
    return await this.projectsRepository.find();
  }

  // Получить проект по ID
  async getById(id: number, options?: FindOneOptions): Promise<Project | null> {
    const project = await this.projectsRepository.findOne(id, options);
    if (!project) throw new HttpException(`Проект с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return project;
  }

  // Изменить проект по ID
  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.getById(id);
    await this.addProjectImage(project.homeDir, updateProjectDto.image);
    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  // Удалить проект по ID
  async remove(id: number): Promise<Project> {
    const project = await this.getById(id);
    const projectPath = `${process.env.WORK_ROOT}/${project.homeDir}`;
    await this.filesService.remove(projectPath);
    return this.projectsRepository.remove(project);
  }
}
