import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { Agency } from '@app/entities/agencies/agency.entity';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';

@ApiTags('Агенства')
@UseGuards(AuthGuard)
@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  // Создать новое агенство
  @Post()
  @ApiOperation({ summary: 'Создать новое агенство' })
  @ApiResponse({ status: 200, type: Agency })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  create(@Body() createAgencyDto: CreateAgencyDto): Promise<Agency> {
    return this.agenciesService.create(createAgencyDto);
  }

  // Получить все агенства
  @Get()
  @ApiOperation({ summary: 'Получить все агенства' })
  @ApiResponse({ status: 200, type: [Agency] })
  getAll() {
    return this.agenciesService.getAll();
  }

  // Получить агенство по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить агенство по ID' })
  @ApiResponse({ status: 200, type: Agency })
  getById(@Param('id') id: string) {
    return this.agenciesService.getById(+id);
  }

  // Изменить агенство по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить агенство по ID' })
  @ApiResponse({ status: 200, type: Agency })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.agenciesService.update(+id, updateAgencyDto);
  }

  // Удалить агенство по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить агенство по ID' })
  @ApiResponse({ status: 200, type: Agency })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.agenciesService.remove(+id);
  }
}
