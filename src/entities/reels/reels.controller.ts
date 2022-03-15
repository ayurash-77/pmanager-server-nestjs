import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
  constructor(private readonly reelsService: ReelsService) {}

  // Создать новый Ролик
  @Post()
  @ApiOperation({ summary: 'Создать новый Ролик' })
  @ApiResponse({ status: 200, type: Reel })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  create(@UserDecorator() user: User, @Body() createReelDto: CreateReelDto): Promise<Reel> {
    return this.reelsService.create(user, createReelDto);
  }

  // Получить все Ролики
  @Get()
  @ApiOperation({ summary: 'Получить все Ролики' })
  @ApiResponse({ status: 200, type: [Reel] })
  getAll() {
    return this.reelsService.getAll();
  }

  // Получить Ролик по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить Ролик по ID' })
  @ApiResponse({ status: 200, type: Reel })
  getById(@Param('id') id: string) {
    return this.reelsService.getById(+id);
  }

  // Изменить Ролик по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить Ролик по ID' })
  @ApiResponse({ status: 200, type: Reel })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateReelDto: UpdateReelDto) {
    return this.reelsService.update(+id, updateReelDto);
  }

  // Удалить Ролик по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить Ролик по ID' })
  @ApiResponse({ status: 200, type: Reel })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.reelsService.remove(+id);
  }
}
