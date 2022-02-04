import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';
import { Brief } from '@app/entities/briefs/brief.entity';
import { Status } from '@app/entities/statuses/status.entity';

@ApiTags('Статусы')
@Controller('statuses')
@UseGuards(AuthGuard)
@RoleDecorator('Producer', 'Art director', 'Manager')
@UseGuards(RolesGuard)
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  // Создать новый статус
  @Post()
  @ApiOperation({ summary: 'Создать новый статус' })
  @ApiResponse({ status: 200, type: Brief })
  createStatus(@Body() dto: CreateStatusDto): Promise<Status> {
    return this.statusesService.create(dto);
  }

  // Получить все статусы
  @Get()
  @ApiOperation({ summary: 'Получить все статусы' })
  @ApiResponse({ status: 200, type: [Status] })
  getAllStatuses(): Promise<Status[]> {
    return this.statusesService.getAll();
  }

  // Получить статус по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить статус по ID' })
  @ApiResponse({ status: 200, type: Brief })
  getStatusById(@Param('id') id: string): Promise<Status> {
    return this.statusesService.getById(+id);
  }

  // Исзменить статус по ID
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto): Promise<Status> {
    return this.statusesService.update(+id, dto);
  }

  // Удалить статус по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить статус по ID' })
  @ApiResponse({ status: 200, type: Brief })
  removeStatus(@Param('id') id: string): Promise<Status> {
    return this.statusesService.remove(+id);
  }
}
