import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from '@app/entities/agencies/agency.entity';
import { Repository } from 'typeorm';
import { IsTakenField } from '@app/utils/isTakenField';

@Injectable()
export class AgenciesService {
  constructor(@InjectRepository(Agency) public repo: Repository<Agency>) {}

  // Создать новое агенство
  async create(dto: CreateAgencyDto): Promise<Agency> {
    await IsTakenField(this.repo, 'name', dto.name, Agency.name);
    const agency = this.repo.create(dto);
    return await this.repo.save(agency);
  }

  // Получить все агенства
  async getAll(): Promise<Agency[]> {
    return await this.repo.find();
  }

  // Получить агенство по ID
  async getById(id: number): Promise<Agency | null> {
    const agency = await this.repo.findOne(id);
    if (!agency) throw new HttpException(`Агенство с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return agency;
  }

  // Изменить агенство по ID
  async update(id: number, dto: UpdateAgencyDto): Promise<Agency> {
    const agency = await this.getById(id);
    await IsTakenField(this.repo, 'name', dto.name, Agency.name, id);
    Object.assign(agency, dto);
    return this.repo.save(agency);
  }

  // Удалить агенство по ID
  async remove(id: number): Promise<Agency> {
    const agency = await this.getById(id);
    return this.repo.remove(agency);
  }
}
