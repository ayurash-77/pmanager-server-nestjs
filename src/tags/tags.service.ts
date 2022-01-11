import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const name = createTagDto.name;

    if (await this.tagRepo.findOne({ name })) {
      throw new BadRequestException(`Тег ${createTagDto.name} уже существует`);
    }
    const tag = this.tagRepo.create(createTagDto);
    return await this.tagRepo.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepo.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepo.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Тег с ID=${id} не найден`);
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepo.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Тег с ID=${id} не найден`);
    }
    Object.assign(tag, updateTagDto);
    return this.tagRepo.save(tag);
  }

  async remove(id: number) {
    const tag = await this.tagRepo.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Тег с ID=${id} не найден`);
    }
    return this.tagRepo.remove(tag);
  }
}
