import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from './tag.entity';
import { AuthGuard } from '@app/users/guards/auth.guard';

@ApiTags('Теги')
@Controller('tags')
@UseGuards(AuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // Создать новый тег
  @Post()
  @ApiOperation({ summary: 'Создать новый тег' })
  @ApiResponse({ status: 200, type: Tag })
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  // Получить все теги
  @Get()
  @ApiOperation({ summary: 'Получить все теги' })
  @ApiResponse({ status: 200, type: [Tag] })
  findAll(): Promise<Tag[]> {
    return this.tagsService.getAll();
  }

  // Получить тег по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить тег по ID' })
  @ApiResponse({ status: 200, type: Tag })
  findById(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.getById(+id);
  }

  // Изменить тег по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить тег по ID' })
  @ApiResponse({ status: 200, type: Tag })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto): Promise<Tag> {
    return this.tagsService.update(+id, updateTagDto);
  }

  // Удалить тег по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить тег по ID' })
  @ApiResponse({ status: 200, type: Tag })
  remove(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.remove(+id);
  }
}
