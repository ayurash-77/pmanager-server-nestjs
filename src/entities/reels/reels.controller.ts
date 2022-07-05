import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReelsService } from './reels.service';
import { CreateReelDto } from './dto/create-reel.dto';
import { UpdateReelDto } from './dto/update-reel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { Reel } from '@app/entities/reels/reel.entity';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';
import { UserDecorator } from '@app/entities/users/decorators/user.decorator';
import { User } from '@app/entities/users/user.entity';

@ApiTags('Ролики')
@UseGuards(AuthGuard)
@Controller('reels')
export class ReelsController {
  constructor(private readonly sequencesService: ReelsService) {}

  // Создать новый ролик
  @Post()
  @ApiOperation({ summary: 'Создать новый ролик' })
  @ApiResponse({ status: 200, type: Reel })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  create(@UserDecorator() user: User, @Body() dto: CreateReelDto): Promise<Reel> {
    return this.sequencesService.create(user, dto);
  }

  // Получить ролики по фильтру
  @Get()
  @ApiOperation({ summary: 'Получить ролики по фильтру' })
  @ApiResponse({ status: 200, type: [Reel] })
  getReels(@Query('projectId') projectId?: string) {
    if (+projectId) return this.sequencesService.getAllByProjectId(+projectId);
    return this.sequencesService.getAll();
  }

  // Получить ролик по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить ролик по ID' })
  @ApiResponse({ status: 200, type: Reel })
  getById(@Param('id') id: string) {
    return this.sequencesService.getById(+id);
  }

  // Изменить ролик по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить ролик по ID' })
  @ApiResponse({ status: 200, type: Reel })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() dto: UpdateReelDto) {
    return this.sequencesService.update(+id, dto);
  }

  // Удалить ролик по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить ролик по ID' })
  @ApiResponse({ status: 200, type: Reel })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.sequencesService.remove(+id);
  }
}
