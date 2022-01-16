import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Brand } from '@app/brands/entities/brand.entity';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // Создать новый Брэнд
  @Post()
  @ApiOperation({ summary: 'Создать новый Брэнд' })
  @ApiResponse({ status: 200, type: Brand })
  create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(createBrandDto);
  }

  // Получить все Брэнды
  @Get()
  @ApiOperation({ summary: 'Получить все Брэнды' })
  @ApiResponse({ status: 200, type: [Brand] })
  getAll() {
    return this.brandsService.getAll();
  }

  // Получить Брэнд по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить Брэнд по ID' })
  @ApiResponse({ status: 200, type: Brand })
  getById(@Param('id') id: string) {
    return this.brandsService.getById(+id);
  }

  // Изменить Брэнд по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить Брэнд по ID' })
  @ApiResponse({ status: 200, type: Brand })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  // Удалить Брэнд по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить Брэнд по ID' })
  @ApiResponse({ status: 200, type: Brand })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
