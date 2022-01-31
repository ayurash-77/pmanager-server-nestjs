import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { IsTakenField } from '@app/utils/isTakenField';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) public repo: Repository<Tag>) {}

  // Создать новый тег
  async create(createTagDto: CreateTagDto): Promise<Tag> {
    await IsTakenField(this.repo, 'name', createTagDto, Tag.name);
    const tag = this.repo.create(createTagDto);
    return await this.repo.save(tag);
  }

  // Получить все теги
  async getAll(): Promise<Tag[]> {
    return await this.repo.find();
  }

  // Получить тег по ID
  async getById(id: number): Promise<Tag | null> {
    const tag = await this.repo.findOne(id);
    if (!tag) throw new HttpException(`Тег с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return tag;
  }

  // Изменить тег по ID
  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.getById(id);
    await IsTakenField(this.repo, 'name', updateTagDto, Tag.name, id);
    Object.assign(tag, updateTagDto);
    return this.repo.save(tag);
  }

  // Удалить тег по ID
  async remove(id: number): Promise<Tag> {
    const tag = await this.getById(id);
    return this.repo.remove(tag);
  }
}
