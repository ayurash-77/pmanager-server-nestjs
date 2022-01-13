import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDecorator } from '@app/users/decorators/user.decorator';
import { User } from '@app/users/entities/user.entity';
import { AuthGuard } from '@app/users/guards/auth.guard';

@ApiTags('Пользователи')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 200, type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.create(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('users/login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.login(loginUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiResponse({ status: 200, type: User })
  async currentUser(@UserDecorator() user: User): Promise<UserResponseInterface> {
    return this.usersService.buildUserResponse(user);
  }

  @Get('users')
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  async findById(@Param('id') id: string): Promise<UserResponseInterface> {
    const user = await this.usersService.findById(+id);
    return this.usersService.buildUserResponse(user);
  }

  @Patch('users/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Изменить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.updateById(+id, updateUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Patch('user')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Изменить текущего пользователя' })
  @ApiResponse({ status: 200, type: User })
  async updateCurrent(
    @UserDecorator() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const updatedUser = await this.usersService.updateById(user.id, updateUserDto);
    return this.usersService.buildUserResponse(updatedUser);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
