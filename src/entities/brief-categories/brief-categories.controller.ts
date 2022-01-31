import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BriefCategoriesService } from './brief-categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Brief } from '@app/entities/briefs/brief.entity';
import { CreateBriefCategoryDto } from '@app/entities/brief-categories/dto/create-brief-category.dto';
import { BriefCategory } from '@app/entities/brief-categories/brief-category.entity';
import { UpdateBriefCategoryDto } from '@app/entities/brief-categories/dto/update-brief-category.dto';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';

@ApiTags('Категории брифов')
@Controller('brief-categories')
@UseGuards(AuthGuard)
@RoleDecorator('Producer', 'Art director', 'Manager')
@UseGuards(RolesGuard)
export class BriefCategoriesController {
  constructor(private readonly briefCategoriesService: BriefCategoriesService) {}

  // Создать новую категорию брифа
  @Post()
  @ApiOperation({ summary: 'Создать новый бриф' })
  @ApiResponse({ status: 200, type: Brief })
  createCategory(@Body() dto: CreateBriefCategoryDto): Promise<BriefCategory> {
    return this.briefCategoriesService.createCategory(dto);
  }

  // Получить все категории брифов
  @Get()
  @ApiOperation({ summary: 'Получить все категории брифов' })
  @ApiResponse({ status: 200, type: [BriefCategory] })
  getAllCategories(): Promise<BriefCategory[]> {
    return this.briefCategoriesService.getAll();
  }

  // Получить категорию брифа по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить бриф по ID' })
  @ApiResponse({ status: 200, type: Brief })
  getCategoryById(@Param('id') id: string): Promise<BriefCategory> {
    return this.briefCategoriesService.getById(+id);
  }

  // Исзменить категорию брифа по ID
  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateBriefCategoryDto): Promise<BriefCategory> {
    return this.briefCategoriesService.update(+id, dto);
  }

  // Удалить категорию брифа по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить категорию брифа по ID' })
  @ApiResponse({ status: 200, type: Brief })
  removeCategory(@Param('id') id: string): Promise<BriefCategory> {
    return this.briefCategoriesService.remove(+id);
  }
}
