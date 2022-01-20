import { Injectable } from '@nestjs/common';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brief } from '@app/briefs/entities/brief.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BriefsService {
  constructor(@InjectRepository(Brief) public briefRepository: Repository<Brief>) {}

  // Создать новый бриф
  async create(createBriefDto: CreateBriefDto): Promise<Brief> {
    const brief = this.briefRepository.create(createBriefDto);
    return await this.briefRepository.save(brief);
  }

  findAll() {
    return `This action returns all briefs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brief`;
  }

  update(id: number, updateBriefDto: UpdateBriefDto) {
    return `This action updates a #${id} brief`;
  }

  remove(id: number) {
    return `This action removes a #${id} brief`;
  }
}
