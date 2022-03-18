import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BriefsCategoriesService } from './briefsCategories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Brief } from '@app/entities/briefs/brief.entity';
import { CreateBriefsCategoryDto } from '@app/entities/briefsCategories/dto/create-briefsCategory.dto';
import { BriefsCategory } from '@app/entities/briefsCategories/briefsCategory.entity';
import { UpdateBriefsCategoryDto } from '@app/entities/briefsCategories/dto/update-briefsCategory.dto';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
// import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
// import { RolesGuard } from '@app/entities/roles/guards/roles.guard';

@ApiTags('Категории брифов')
@Controller('briefsCategories')
@UseGuards(AuthGuard)
// @RoleDecorator('Producer', 'Art director', 'Manager')
// @UseGuards(RolesGuard)
export class BriefsCategoriesController {
  constructor(private readonly briefCategoriesService: BriefsCategoriesService) {}

  // Создать новую категорию брифа
  @Post()
  @ApiOperation({ summary: 'Создать новую категорию брифа' })
  @ApiResponse({ status: 200, type: Brief })
  createCategory(@Body() dto: CreateBriefsCategoryDto): Promise<BriefsCategory> {
    return this.briefCategoriesService.create(dto);
  }

  // Получить все категории брифов
  @Get()
  @ApiOperation({ summary: 'Получить все категории брифов' })
  @ApiResponse({ status: 200, type: [BriefsCategory] })
  getAllCategories(): Promise<BriefsCategory[]> {
    return this.briefCategoriesService.getAll();
  }

  // Получить категорию брифа по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить бриф по ID' })
  @ApiResponse({ status: 200, type: Brief })
  getCategoryById(@Param('id') id: string): Promise<BriefsCategory> {
    return this.briefCategoriesService.getById(+id);
  }

  // Исзменить категорию брифа по ID
  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateBriefsCategoryDto): Promise<BriefsCategory> {
    return this.briefCategoriesService.update(+id, dto);
  }

  // Удалить категорию брифа по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить категорию брифа по ID' })
  @ApiResponse({ status: 200, type: Brief })
  removeCategory(@Param('id') id: string): Promise<BriefsCategory> {
    return this.briefCategoriesService.remove(+id);
  }
}
