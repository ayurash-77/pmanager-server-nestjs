import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brief } from '@app/entities/briefs/brief.entity';
import { Repository } from 'typeorm';
import { FilesService } from '@app/files/files.service';
import { ProjectsService } from '@app/entities/projects/projects.service';
import { MoveFileDto } from '@app/files/dto/move-file.dto';
import { path as appPath } from 'app-root-path';
import { Project } from '@app/entities/projects/project.entity';
import { format } from 'date-fns';
import * as path from 'path';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { BriefsCategory } from '@app/entities/briefsCategories/briefsCategory.entity';
import { User } from '@app/entities/users/user.entity';
import { IsTakenField } from '@app/utils/isTakenField';

@Injectable()
export class BriefsService {
  constructor(
    @InjectRepository(Brief) public briefRepository: Repository<Brief>,
    @InjectRepository(Project) public projectRepository: Repository<Project>,
    @InjectRepository(BriefsCategory) public briefCategoryRepository: Repository<BriefsCategory>,
    private projectsService: ProjectsService,
    private filesService: FilesService,
  ) {}

  // Получить папку с брифом
  async getBriefFolder(projectId: number) {
    const project = await this.projectsService.getById(projectId);
    return `${project.homeDir}/materials/briefs`;
  }

  // Создать новый бриф
  async create(user: User, dto: CreateBriefDto): Promise<Brief> {
    const createdAt = new Date();
    const briefDate = format(createdAt, 'yyyy.MM.dd_HH-mm');
    const project = await this.projectsService.getById(dto.projectId);
    const briefDir = await this.getBriefFolder(dto.projectId);

    const category = dto.categoryId
      ? await this.briefCategoryRepository.findOne(dto.categoryId)
      : await this.briefCategoryRepository.findOne({ where: { code: 1 } });

    const name = dto.name || `Brief_${category.name}`;
    const filename = `${name}_${briefDate}`;
    const originalName = dto.originalName;
    const ext = path.extname(dto.originalName);
    const dstUrl = `${briefDir}/${filename}${ext}`;

    if (await this.briefRepository.findOne({ filename })) {
      throw new HttpException(
        `Бриф с названием '${name}' и датой '${briefDate}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    // if (await this.briefRepository.findOne({ originalName })) {
    //   throw new HttpException(
    //     `Бриф с исходным именем файла '${originalName}' уже существует`,
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    const srcPath = `${appPath}/${dto.url}`;
    const dstPath = `${process.env.WORK_ROOT}/${dstUrl}`;
    const moveFileDto: MoveFileDto = { srcPath, dstPath };
    await this.filesService.moveFile(moveFileDto);

    dto.name = name;
    const brief = await this.briefRepository.create(dto);
    brief.createdBy = user;
    brief.filename = filename;
    brief.originalName = originalName;
    brief.updatedBy = user;
    brief.project = project;
    brief.url = dstUrl;
    brief.category = category;
    await this.briefRepository.save(brief);

    return brief;
  }

  // Получить все брифы
  getAll(): Promise<Brief[]> {
    return this.briefRepository.find();
  }

  // Получить бриф по ID
  async getById(id: number, options?: FindOneOptions): Promise<Brief> {
    const brief = await this.briefRepository.findOne(id, options);

    if (!brief) throw new HttpException(`Бриф с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return brief;
  }

  async update(user: User, id: number, updateBriefDto: UpdateBriefDto): Promise<Brief> {
    const brief = await this.getById(id);
    await IsTakenField(this.briefRepository, 'name', updateBriefDto, Brief.name, id);
    Object.assign(brief, updateBriefDto);
    brief.updatedBy = user;
    return this.briefRepository.save(brief);
  }

  // Удалить бриф по ID
  async remove(id: number): Promise<Brief> {
    const brief = await this.getById(id);
    const briefPath = `${process.env.WORK_ROOT}/${brief.url}`;
    await this.filesService.remove(briefPath);
    return this.briefRepository.remove(brief);
  }
}
