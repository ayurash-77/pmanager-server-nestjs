import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Brief } from '@app/briefs/entities/brief.entity';

@ApiTags('Брифы')
@Controller('briefs')
export class BriefsController {
  constructor(private readonly briefsService: BriefsService) {}

  // Создать новый бриф
  @Post()
  @ApiOperation({ summary: 'Создать новый бриф' })
  @ApiResponse({ status: 200, type: Brief })
  create(@Body() createBriefDto: CreateBriefDto): Promise<Brief> {
    return this.briefsService.create(createBriefDto);
  }

  @Get()
  findAll() {
    return this.briefsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.briefsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBriefDto: UpdateBriefDto) {
    return this.briefsService.update(+id, updateBriefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.briefsService.remove(+id);
  }
}
