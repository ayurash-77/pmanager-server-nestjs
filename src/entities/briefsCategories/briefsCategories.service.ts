import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BriefsCategory } from '@app/entities/briefsCategories/briefsCategory.entity';
import { Repository } from 'typeorm';
import { CreateBriefsCategoryDto } from '@app/entities/briefsCategories/dto/create-briefsCategory.dto';
import { IsTakenField } from '@app/utils/isTakenField';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UpdateBriefsCategoryDto } from '@app/entities/briefsCategories/dto/update-briefsCategory.dto';

@Injectable()
export class BriefsCategoriesService {
  constructor(@InjectRepository(BriefsCategory) public briefsCategoriesRepo: Repository<BriefsCategory>) {}

  // Создать новую категорию брифа
  async create(dto: CreateBriefsCategoryDto): Promise<BriefsCategory> {
    await IsTakenField(this.briefsCategoriesRepo, 'name', dto, BriefsCategory.name);
    await IsTakenField(this.briefsCategoriesRepo, 'code', dto, BriefsCategory.name);
    const category = await this.briefsCategoriesRepo.create(dto);
    return await this.briefsCategoriesRepo.save(category);
  }

  // Получить все категории брифов
  async getAll(): Promise<BriefsCategory[]> {
    return this.briefsCategoriesRepo.find();
  }

  // Получить категорию брифа по ID
  async getById(id: number, options?: FindOneOptions): Promise<BriefsCategory> {
    const category = await this.briefsCategoriesRepo.findOne(id, options);
    if (!category) throw new HttpException(`Категория брифа с id=${id} не найдена`, HttpStatus.NOT_FOUND);
    return category;
  }

  // Изменить категорию брифа по ID
  async update(id: number, dto: UpdateBriefsCategoryDto) {
    const category = await this.getById(id);
    await IsTakenField(this.briefsCategoriesRepo, 'name', dto, BriefsCategory.name, id);
    Object.assign(category, dto);
    return this.briefsCategoriesRepo.save(category);
  }

  // Удалить категорию брифа по ID
  async remove(id: number): Promise<BriefsCategory> {
    const category = await this.getById(id);
    return this.briefsCategoriesRepo.remove(category);
  }
}
