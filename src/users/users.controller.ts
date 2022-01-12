import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { UserDecorator } from '@app/users/decorators/user.decorator';
import { User } from '@app/users/entities/user.entity';

@ApiTags('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 200, type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.create(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.login(loginUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Get('current')
  async currentUser(@UserDecorator() user: User): Promise<UserResponseInterface> {
    return this.usersService.buildUserResponse(user);
  }

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
