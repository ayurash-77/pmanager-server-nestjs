import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ShotsService } from './shots.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { Shot } from '@app/entities/shots/shot.entity';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';
import { UserDecorator } from '@app/entities/users/decorators/user.decorator';
import { User } from '@app/entities/users/user.entity';

@ApiTags('Шоты')
@UseGuards(AuthGuard)
@Controller('shots')
export class ShotsController {
  constructor(private readonly shotsService: ShotsService) {}

  // Создать новый шот
  @Post()
  @ApiOperation({ summary: 'Создать новый шот' })
  @ApiResponse({ status: 200, type: Shot })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  create(@UserDecorator() user: User, @Body() createShotDto: CreateShotDto): Promise<Shot> {
    return this.shotsService.create(user, createShotDto);
  }

  // Получить все шоты
  @Get()
  @ApiOperation({ summary: 'Получить все шоты' })
  @ApiResponse({ status: 200, type: [Shot] })
  getAll(@Query('projectId') projectId?: string) {
    return this.shotsService.getAll(+projectId);
  }

  // Получить все шоты проекта
  @Get('projects/:id')
  @ApiOperation({ summary: 'Получить все шоты проекта' })
  @ApiResponse({ status: 200, type: [Shot] })
  getAllByProjectId(@Param('id') id: string) {
    return this.shotsService.getAllByProjectId(+id);
  }

  // Получить шот по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить шот по ID' })
  @ApiResponse({ status: 200, type: Shot })
  getById(@Param('id') id: string) {
    return this.shotsService.getById(+id);
  }

  // Изменить шот по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить шот по ID' })
  @ApiResponse({ status: 200, type: Shot })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateShotDto: UpdateShotDto) {
    return this.shotsService.update(+id, updateShotDto);
  }

  // Удалить шот по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить шот по ID' })
  @ApiResponse({ status: 200, type: Shot })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.shotsService.remove(+id);
  }
}
