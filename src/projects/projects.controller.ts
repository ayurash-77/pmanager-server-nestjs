import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/users/guards/auth.guard';
import { Project } from '@app/projects/entities/project.entity';
import { RoleDecorator } from '@app/roles/decorators/role.decorator';
import { RolesGuard } from '@app/roles/guards/roles.guard';
import { UserDecorator } from '@app/users/decorators/user.decorator';
import { User } from '@app/users/entities/user.entity';
import { ProjectResponseInterface } from '@app/projects/types/projectResponse.interface';

@ApiTags('Проекты')
@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Создать новый проект
  @Post()
  @ApiOperation({ summary: 'Создать новый проект' })
  @ApiResponse({ status: 200, type: Project })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  async create(
    @UserDecorator() currentUser: User,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectResponseInterface> {
    const project = await this.projectsService.create(currentUser, createProjectDto);
    return this.projectsService.buildProjectResponse(project);
  }

  // Получить все проекты
  @Get()
  @ApiOperation({ summary: 'Получить все проекты' })
  @ApiResponse({ status: 200, type: [Project] })
  async getAll(): Promise<ProjectResponseInterface[]> {
    const projects = await this.projectsService.getAll();
    return projects.map(project => this.projectsService.buildProjectResponse(project));
  }

  // Получить проект по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить проект по ID' })
  @ApiResponse({ status: 200, type: Project })
  async getById(@Param('id') id: string): Promise<ProjectResponseInterface> {
    const project = await this.projectsService.getById(+id);
    return this.projectsService.buildProjectResponse(project);
  }

  // Изменить проект по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить проект по ID' })
  @ApiResponse({ status: 200, type: Project })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsService.update(+id, updateProjectDto);
    return this.projectsService.buildProjectResponse(project);
  }

  // Удалить проект по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект по ID' })
  @ApiResponse({ status: 200, type: Project })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(
    @Param('id')
    id: string,
  ) {
    return this.projectsService.remove(+id);
  }
}
