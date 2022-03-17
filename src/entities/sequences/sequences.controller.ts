import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SequencesService } from './sequences.service';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { Sequence } from '@app/entities/sequences/sequence.entity';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';
import { UserDecorator } from '@app/entities/users/decorators/user.decorator';
import { User } from '@app/entities/users/user.entity';

@ApiTags('Хронометражи')
@UseGuards(AuthGuard)
@Controller('sequences')
export class SequencesController {
  constructor(private readonly sequencesService: SequencesService) {}

  // Создать новый Хронометраж
  @Post()
  @ApiOperation({ summary: 'Создать новый Хронометраж' })
  @ApiResponse({ status: 200, type: Sequence })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  create(@UserDecorator() user: User, @Body() createSequenceDto: CreateSequenceDto): Promise<Sequence> {
    return this.sequencesService.create(user, createSequenceDto);
  }

  // Получить все Хронометражи
  @Get()
  @ApiOperation({ summary: 'Получить все Хронометражи' })
  @ApiResponse({ status: 200, type: [Sequence] })
  getAll(@Query('projectId') projectId?: string) {
    return this.sequencesService.getAll(+projectId);
  }

  // Получить все Хронометражи проекта
  @Get('projects/:id')
  @ApiOperation({ summary: 'Получить все Хронометражи проекта' })
  @ApiResponse({ status: 200, type: [Sequence] })
  getAllByProjectId(@Param('id') id: string) {
    return this.sequencesService.getAllByProjectId(+id);
  }

  // Получить Хронометраж по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить Хронометраж по ID' })
  @ApiResponse({ status: 200, type: Sequence })
  getById(@Param('id') id: string) {
    return this.sequencesService.getById(+id);
  }

  // Изменить Хронометраж по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить Хронометраж по ID' })
  @ApiResponse({ status: 200, type: Sequence })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateSequenceDto: UpdateSequenceDto) {
    return this.sequencesService.update(+id, updateSequenceDto);
  }

  // Удалить Хронометраж по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить Хронометраж по ID' })
  @ApiResponse({ status: 200, type: Sequence })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.sequencesService.remove(+id);
  }
}
