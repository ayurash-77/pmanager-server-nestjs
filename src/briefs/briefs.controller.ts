import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Brief } from '@app/briefs/entities/brief.entity';
import { AuthGuard } from '@app/users/guards/auth.guard';
import { RoleDecorator } from '@app/roles/decorators/role.decorator';
import { RolesGuard } from '@app/roles/guards/roles.guard';
import { Project } from '@app/projects/entities/project.entity';

@ApiTags('Брифы')
@Controller('briefs')
@UseGuards(AuthGuard)
@RoleDecorator('Producer', 'Art director', 'Manager')
@UseGuards(RolesGuard)
export class BriefsController {
  constructor(private readonly briefsService: BriefsService) {}

  // Создать новый бриф
  @Post()
  @ApiOperation({ summary: 'Создать новый бриф' })
  @ApiResponse({ status: 200, type: Brief })
  create(@Body() createBriefDto: CreateBriefDto): Promise<Brief> {
    return this.briefsService.create(createBriefDto);
  }

  // Получить все брифы
  @Get()
  @ApiOperation({ summary: 'Получить все брифы' })
  @ApiResponse({ status: 200, type: [Project] })
  getAll(): Promise<Brief[]> {
    return this.briefsService.getAll();
  }

  // Получить бриф по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить бриф по ID' })
  @ApiResponse({ status: 200, type: Brief })
  getById(@Param('id') id: string): Promise<Brief> {
    return this.briefsService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBriefDto: UpdateBriefDto) {
    return this.briefsService.update(+id, updateBriefDto);
  }

  // Удалить бриф по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить бриф по ID' })
  @ApiResponse({ status: 200, type: Brief })
  remove(@Param('id') id: string) {
    return this.briefsService.remove(+id);
  }
}
