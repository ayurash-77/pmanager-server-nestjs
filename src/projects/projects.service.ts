import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@app/projects/entities/project.entity';
import { Repository } from 'typeorm';
import { User } from '@app/users/entities/user.entity';
import { ProjectResponseInterface } from '@app/projects/types/projectResponse.interface';
import { FilesService } from '@app/files/files.service';
import { format, getQuarter } from 'date-fns';
import { MoveFileDto } from '@app/files/dto/move-file.dto';
import { path as appPath } from 'app-root-path';
import { ProjectDateInterface } from '@app/projects/types/projectDate.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) public repo: Repository<Project>,
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
      },
    };
  }

  // Получить объект даты
  getProjectDate(date): ProjectDateInterface {
    const dateStr = format(date, 'yyyy.MM.dd');
    const year = date.getFullYear();
    const quarter = getQuarter(date);
    const yearQuarter = `${year}-${quarter}`;
    return { date, dateStr, year, quarter, yearQuarter };
  }

  // Получить домашншюю папку проекта
  async getHomeDir(dto: UpdateProjectDto, date) {
    const projectDate: ProjectDateInterface = this.getProjectDate(date);
    const newTitle = dto.title.replace(/ /g, '-');
    const homeDir = `${projectDate.yearQuarter}/${newTitle}_${projectDate.dateStr}`;

    const candidate = await this.repo.findOne({ homeDir });
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
      const project = await this.repo.create(createProjectDto);

      // Добавить изображение проекта если существует
      await this.addProjectImage(createProjectDto.homeDir, createProjectDto.image);

      project.homeDir = homeDir;
      project.owner = user;
      return await this.repo.save(project);
    }
  }

  // Добавить изображение проекта если существует
  async addProjectImage(homeDir, imagePath) {
    if (imagePath) {
      const uploadDir = `${appPath}/upload`;
      const moveFileDto: MoveFileDto = {
        srcPath: `${uploadDir}/${imagePath}`,
        dstPath: `${process.env.WORK_ROOT}/${homeDir}/.pmdata/projectThumbnail.jpg`,
      };
      await this.filesService.moveFile(moveFileDto);
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
    await this.addProjectImage(project.homeDir, updateProjectDto.image);
    Object.assign(project, updateProjectDto);
    return this.repo.save(project);
  }

  // Удалить проект по ID
  async remove(id: number): Promise<Project> {
    const project = await this.getById(id);
    return this.repo.remove(project);
  }
}
