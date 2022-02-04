import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BriefCategory } from '@app/entities/brief-categories/brief-category.entity';
import { Repository } from 'typeorm';
import { CreateBriefCategoryDto } from '@app/entities/brief-categories/dto/create-brief-category.dto';
import { IsTakenField } from '@app/utils/isTakenField';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UpdateBriefCategoryDto } from '@app/entities/brief-categories/dto/update-brief-category.dto';

@Injectable()
export class BriefCategoriesService {
  constructor(@InjectRepository(BriefCategory) public briefCategoryRepo: Repository<BriefCategory>) {}

  // Создать новую категорию брифа
  async create(dto: CreateBriefCategoryDto): Promise<BriefCategory> {
    await IsTakenField(this.briefCategoryRepo, 'name', dto, BriefCategory.name);
    await IsTakenField(this.briefCategoryRepo, 'code', dto, BriefCategory.name);
    const category = await this.briefCategoryRepo.create(dto);
    return await this.briefCategoryRepo.save(category);
  }

  // Получить все категории брифов
  async getAll(): Promise<BriefCategory[]> {
    return this.briefCategoryRepo.find();
  }

  // Получить категорию брифа по ID
  async getById(id: number, options?: FindOneOptions): Promise<BriefCategory> {
    const category = await this.briefCategoryRepo.findOne(id, options);
    if (!category) throw new HttpException(`Категория брифа с id=${id} не найдена`, HttpStatus.NOT_FOUND);
    return category;
  }

  // Изменить категорию брифа по ID
  async update(id: number, dto: UpdateBriefCategoryDto) {
    const category = await this.getById(id);
    await IsTakenField(this.briefCategoryRepo, 'name', dto, BriefCategory.name, id);
    Object.assign(category, dto);
    return this.briefCategoryRepo.save(category);
  }

  // Удалить категорию брифа по ID
  async remove(id: number): Promise<BriefCategory> {
    const category = await this.getById(id);
    return this.briefCategoryRepo.remove(category);
  }
}
