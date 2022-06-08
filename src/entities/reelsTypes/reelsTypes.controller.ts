import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReelsTypesService } from './reelsTypes.service';
import { CreateReelsTypeDto } from './dto/create-reelsType.dto';
import { UpdateReelsTypeDto } from './dto/update-reelsType.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';
import { UserDecorator } from '@app/entities/users/decorators/user.decorator';
import { User } from '@app/entities/users/user.entity';

@ApiTags('типы роликов')
@UseGuards(AuthGuard)
@Controller('reels-types')
export class ReelsTypesController {
  constructor(private readonly reelsService: ReelsTypesService) {}

  // Создать новый тип ролика
  @Post()
  @ApiOperation({ summary: 'Создать новый тип ролика' })
  @ApiResponse({ status: 200, type: ReelsType })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  create(@UserDecorator() user: User, @Body() createReelsTypeDto: CreateReelsTypeDto): Promise<ReelsType> {
    return this.reelsService.create(user, createReelsTypeDto);
  }

  // Получить типы роликов по фильтру
  @Get()
  @ApiOperation({ summary: 'Получить все типы роликов' })
  @ApiResponse({ status: 200, type: [ReelsType] })
  getAll(@Query('projectId') projectId?: string) {
    if (+projectId) return this.reelsService.getAllByProjectId(+projectId);
    return this.reelsService.getAll();
  }

  // Получить тип ролика по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить тип ролика по ID' })
  @ApiResponse({ status: 200, type: ReelsType })
  getById(@Param('id') id: string) {
    return this.reelsService.getById(+id);
  }

  // Изменить тип ролика по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить тип ролика по ID' })
  @ApiResponse({ status: 200, type: ReelsType })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateReelsTypeDto: UpdateReelsTypeDto) {
    return this.reelsService.update(+id, updateReelsTypeDto);
  }

  // Удалить тип ролика по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить тип ролика по ID' })
  @ApiResponse({ status: 200, type: ReelsType })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.reelsService.remove(+id);
  }
}
