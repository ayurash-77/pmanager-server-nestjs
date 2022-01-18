import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDecorator } from '@app/users/decorators/user.decorator';
import { User } from '@app/users/entities/user.entity';
import { AdminGuard } from '@app/users/guards/admin.guard';
import { AdminUpdateUserDto } from '@app/users/dto/admin-update-user.dto';
import { AuthGuard } from '@app/users/guards/auth.guard';

@ApiTags('Пользователи')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Регистрация нового пользователя
  @Post('users/register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 200, type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.create(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  // Авторизация
  @Post('users/login')
  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: User })
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.login(loginUserDto);
    return this.usersService.buildUserResponse(user);
  }

  // Получить текущего пользователя
  @Get('user')
  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard)
  async currentUser(@UserDecorator() user: User): Promise<UserResponseInterface> {
    return this.usersService.buildUserResponse(user);
  }

  // Получить всех пользователей
  @Get('users')
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(AuthGuard)
  getAll() {
    return this.usersService.getAll();
  }

  // Получить пользователя по ID
  @Get('users/:id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard)
  // @RoleDecorator('3d artist')
  // @UseGuards(RolesGuard)
  async getById(@Param('id') id: string): Promise<UserResponseInterface> {
    const user = await this.usersService.getById(+id);
    return this.usersService.buildUserResponse(user);
  }

  // Изменить пользователя по ID
  @Patch('users/:id')
  @ApiOperation({ summary: 'Изменить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async updateById(
    @Param('id') id: string,
    @Body() adminUpdateUserDto: AdminUpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.updateById(+id, adminUpdateUserDto);
    return this.usersService.buildUserResponse(user);
  }

  // Изменить текущего пользователя
  @Patch('user')
  @ApiOperation({ summary: 'Изменить текущего пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard)
  async updateCurrent(
    @UserDecorator() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const updatedUser = await this.usersService.updateById(user.id, updateUserDto);
    return this.usersService.buildUserResponse(updatedUser);
  }

  // Удалить пользователя по ID
  @Delete('users/:id')
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
