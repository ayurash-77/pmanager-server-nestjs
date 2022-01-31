import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { Project } from '@app/entities/projects/project.entity';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';
import { UserDecorator } from '@app/entities/users/decorators/user.decorator';
import { User } from '@app/entities/users/user.entity';
import { ProjectResponseInterface } from '@app/entities/projects/types/projectResponse.interface';
import { RemoveProjectResponseInterface } from '@app/entities/projects/types/removeProjectResponse.interface';

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
    const project = await this.projectsService.getById(+id, { relations: ['briefs'] });
    return this.projectsService.buildProjectResponse(project);
  }

  // Изменить проект по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить проект по ID' })
  @ApiResponse({ status: 200, type: Project })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponseInterface> {
    const project = await this.projectsService.update(+id, updateProjectDto);
    return this.projectsService.buildProjectResponse(project);
  }

  // Удалить проект по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект по ID' })
  @ApiResponse({ status: 200, type: Project })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string): Promise<RemoveProjectResponseInterface> {
    const project = await this.projectsService.remove(+id);
    return this.projectsService.buildRemoveProjectResponse(project);
  }
}
