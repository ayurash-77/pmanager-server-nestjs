import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Роли')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Создать новую роль
  @Post()
  @ApiOperation({ summary: 'Создать новую роль' })
  @ApiResponse({ status: 200, type: Role })
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  // Получить все роли
  @Get()
  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: 200, type: [Role] })
  findAll() {
    return this.rolesService.getAll();
  }

  // Получить роль по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  findById(@Param('id') id: string) {
    return this.rolesService.getById(+id);
  }

  // Изменить роль по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  // Удалить роль по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить роль по ID' })
  @ApiResponse({ status: 200, type: Role })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
