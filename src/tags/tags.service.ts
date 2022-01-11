import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private repo: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const name = createTagDto.name;

    if (await this.repo.findOne({ name })) {
      throw new BadRequestException(`Тег ${createTagDto.name} уже существует`);
    }
    const tag = this.repo.create(createTagDto);
    return await this.repo.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const tag = await this.repo.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Тег с ID=${id} не найден`);
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.repo.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Тег с ID=${id} не найден`);
    }
    Object.assign(tag, updateTagDto);
    return this.repo.save(tag);
  }

  async remove(id: number) {
    const tag = await this.repo.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Тег с ID=${id} не найден`);
    }
    return this.repo.remove(tag);
  }
}
