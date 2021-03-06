import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@app/entities/projects/project.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';
import { ProjectResponseInterface } from '@app/entities/projects/types/projectResponse.interface';
import { FilesService } from '@app/files/files.service';
import { format, getQuarter } from 'date-fns';
import { MoveFileDto } from '@app/files/dto/move-file.dto';
import { path as appPath } from 'app-root-path';
import { ProjectDateInterface } from '@app/entities/projects/types/projectDate.interface';
import { RemoveProjectResponseInterface } from '@app/entities/projects/types/removeProjectResponse.interface';
import * as fse from 'fs-extra';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { StatusesService } from '@app/entities/statuses/statuses.service';
import { BrandsService } from '@app/entities/brands/brands.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) public projectsRepository: Repository<Project>,
    private filesService: FilesService,
    private statusesService: StatusesService,
    private brandsService: BrandsService,
  ) {}

  buildProjectResponse(project: Project): ProjectResponseInterface {
    if (!project) return null;
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
  async create(user: User, dto: CreateProjectDto): Promise<Project> {
    const homeDir = await this.getHomeDir(dto, new Date());

    if (homeDir) {
      const project = await this.projectsRepository.create(dto);
      project.homeDir = homeDir;

      await fse.ensureDir(`${process.env.WORK_ROOT}/${homeDir}`);
      await this.addProjectImage(project.homeDir, dto.image);

      const status = await this.statusesService.getByCode(1);

      if (dto.brandId) project.brand = await this.brandsService.getById(dto.brandId);
      if (dto.clientId) project.client = await this.brandsService.getById(dto.clientId);
      if (dto.agencyId) project.agency = await this.brandsService.getById(dto.agencyId);

      project.owner = user;
      project.status = status;
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
    return await this.projectsRepository.find({
      order: { title: 'ASC' },
      // relations: ['briefs']
    });
  }

  // Получить проект по ID
  async getById(id: number, options?: FindOneOptions): Promise<Project | null> {
    const project = await this.projectsRepository.findOne(id, options);
    if (!project) return null;
    // const dateStr = format(project.createdAt, 'yyyy.MM.dd');
    // console.log(dateStr);
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
