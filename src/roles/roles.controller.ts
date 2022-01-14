import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddJobDto } from '@app/roles/dto/add-job.dto';

@ApiTags('Роли')
@Controller('api')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Создать новую роль
  @Post('roles')
  @ApiOperation({ summary: 'Создать новую роль' })
  @ApiResponse({ status: 200, type: Role })
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  // Получить все роли
  @Get('roles')
  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: 200, type: [Role] })
  getAll() {
    return this.rolesService.getAll();
  }

  // Получить роль по ID
  @Get('roles/:id')
  @ApiOperation({ summary: 'Получить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  getById(@Param('id') id: string) {
    return this.rolesService.getById(+id);
  }

  // Изменить роль по ID
  @Patch('roles/:id')
  @ApiOperation({ summary: 'Изменить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  // Удалить роль по ID
  @Delete('roles/:id')
  @ApiOperation({ summary: 'Удалить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  // Добавить тип работ
  @Post('roles/add-job')
  addJob(@Body() dto: AddJobDto) {
    return this.rolesService.addJob(dto);
  }

  // Удалить тип работ
  @Post('roles/remove-job')
  removeJob(@Body() dto: AddJobDto) {
    return this.rolesService.removeJob(dto);
  }
}
