import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';

@ApiTags('Теги')
@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый тег' })
  @ApiResponse({ status: 200, type: Tag })
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все теги' })
  @ApiResponse({ status: 200, type: [Tag] })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить тег по ID' })
  @ApiResponse({ status: 200, type: Tag })
  findById(@Param('id') id: string) {
    return this.tagsService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменить тег по ID' })
  @ApiResponse({ status: 200, type: Tag })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить тег по ID' })
  @ApiResponse({ status: 200, type: Tag })
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
