import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddJobDto } from '@app/entities/roles/dto/add-job.dto';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';

@ApiTags('Роли')
@Controller()
@UseGuards(AuthGuard)
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
  getAll(): Promise<Role[]> {
    return this.rolesService.getAll();
  }

  // Получить роль по ID
  @Get('roles/:id')
  @ApiOperation({ summary: 'Получить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  getById(@Param('id') id: string): Promise<Role> {
    return this.rolesService.getById(+id);
  }

  // Изменить роль по ID
  @Patch('roles/:id')
  @ApiOperation({ summary: 'Изменить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  // Удалить роль по ID
  @Delete('roles/:id')
  @ApiOperation({ summary: 'Удалить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  remove(@Param('id') id: string): Promise<Role> {
    return this.rolesService.remove(+id);
  }

  // Добавить тип работ
  @Post('roles/add-job')
  @ApiOperation({ summary: 'Добавить тип работ к роли' })
  @ApiResponse({ status: 200, type: Role })
  addJob(@Body() dto: AddJobDto): Promise<Role> {
    return this.rolesService.addJob(dto);
  }

  // Удалить тип работ
  @Post('roles/remove-job')
  @ApiOperation({ summary: 'Удалить тип работ из роли' })
  @ApiResponse({ status: 200, type: Role })
  removeJob(@Body() dto: AddJobDto): Promise<Role> {
    return this.rolesService.removeJob(dto);
  }
}
