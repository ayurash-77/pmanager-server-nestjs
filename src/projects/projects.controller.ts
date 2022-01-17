import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/users/guards/auth.guard';
import { Project } from '@app/projects/entities/project.entity';
import { RoleDecorator } from '@app/roles/decorators/role.decorator';
import { RolesGuard } from '@app/roles/guards/roles.guard';

@ApiTags('Проекты')
@UseGuards(AuthGuard)
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Создать новый проект
  @Post()
  @ApiOperation({ summary: 'Создать новый проект' })
  @ApiResponse({ status: 200, type: Project })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  // Получить все проекты
  @Get()
  @ApiOperation({ summary: 'Получить все проекты' })
  @ApiResponse({ status: 200, type: [Project] })
  getAll() {
    return this.projectsService.getAll();
  }

  // Получить проект по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить проект по ID' })
  @ApiResponse({ status: 200, type: Project })
  getById(@Param('id') id: string) {
    return this.projectsService.getById(+id);
  }

  // Изменить проект по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить проект по ID' })
  @ApiResponse({ status: 200, type: Project })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  // Удалить проект по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект по ID' })
  @ApiResponse({ status: 200, type: Project })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
