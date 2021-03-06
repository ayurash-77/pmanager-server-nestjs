import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '@app/entities/brands/brand.entity';
import { Repository } from 'typeorm';
import { IsTakenField } from '@app/utils/isTakenField';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) public repo: Repository<Brand>) {}

  // Создать новый брэнд
  async create(dto: CreateBrandDto): Promise<Brand> {
    await IsTakenField(this.repo, 'name', dto.name, Brand.name);
    const brand = this.repo.create(dto);
    return await this.repo.save(brand);
  }

  // Получить все брэнды
  async getAll(): Promise<Brand[]> {
    return await this.repo.find();
  }

  // Получить брэнд по ID
  async getById(id: number): Promise<Brand | null> {
    const brand = await this.repo.findOne(id);
    if (!brand) throw new HttpException(`Брэнд с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return brand;
  }

  // Изменить брэнд по ID
  async update(id: number, dto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.getById(id);
    await IsTakenField(this.repo, 'name', dto.name, Brand.name, id);
    Object.assign(brand, dto);
    return this.repo.save(brand);
  }

  // Удалить брэнд по ID
  async remove(id: number): Promise<Brand> {
    const brand = await this.getById(id);
    return this.repo.remove(brand);
  }
}
