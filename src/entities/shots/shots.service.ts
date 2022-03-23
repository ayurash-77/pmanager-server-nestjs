import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shot } from '@app/entities/shots/shot.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';
import { ProjectsService } from '@app/entities/projects/projects.service';
import { ReelsService } from '@app/entities/reels/reels.service';
import { IsTakenField } from '@app/utils/isTakenField';
import { Reel } from '@app/entities/reels/reel.entity';

@Injectable()
export class ShotsService {
  constructor(
    @InjectRepository(Shot) public shotsRepo: Repository<Shot>,
    @InjectRepository(Reel) public reelsRepo: Repository<Reel>,
    private projectsService: ProjectsService,
    private reelsService: ReelsService,
  ) {}

  // Создать новый шот
  async create(user: User, dto: CreateShotDto): Promise<Shot> {
    const project = await this.projectsService.getById(dto.projectId);
    const reel = await this.reelsService.getById(dto.reelId);
    const reelsTypeCode = reel.reelsType.code;

    const code = `${reelsTypeCode}_${dto.number}`;
    await IsTakenField(this.shotsRepo, 'code', code, Shot.name);

    const shot = this.shotsRepo.create(dto);
    const isNotExists = reel.shots.findIndex(shotInReel => shotInReel.id === shot.id) === -1;

    shot.code = code;
    shot.createdBy = user;
    shot.project = project;
    await this.shotsRepo.save(shot);

    if (isNotExists) {
      reel.shots.push(shot);
      await this.reelsRepo.save(reel);
    }

    return shot;
  }

  // Получить все шоты
  async getAll(projectId?: number): Promise<Shot[]> {
    if (projectId) return await this.shotsRepo.find({ where: { projectId } });
    return await this.shotsRepo.find();
  }

  // Получить все шоты проекта
  async getAllByProjectId(id: number): Promise<Shot[]> {
    return await this.shotsRepo.find({ where: { projectId: id } });
  }

  // Получить шот по ID
  async getById(id: number): Promise<Shot | null> {
    const shot = await this.shotsRepo.findOne(id);
    if (!shot) throw new HttpException(`Шот с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return shot;
  }

  // Изменить шот по ID
  async update(id: number, updateShotDto: UpdateShotDto): Promise<Shot> {
    const shot = await this.getById(id);
    // await IsTakenField(this.shotsRepo, 'name', updateShotDto, Shot.name, id);
    Object.assign(shot, updateShotDto);
    return this.shotsRepo.save(shot);
  }

  // Удалить шот по ID
  async remove(id: number): Promise<Shot> {
    const shot = await this.getById(id);
    return this.shotsRepo.remove(shot);
  }
}
