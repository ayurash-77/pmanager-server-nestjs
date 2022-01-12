import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PartialType(User) {
  // @ApiProperty({ example: 'vasyapupkin', description: 'Username' })
  // @IsNotEmpty()
  // @IsString()
  // readonly username: string;
  //
  // @ApiProperty({ example: 'user@mail.ru', description: 'Email пользователя' })
  // @IsNotEmpty()
  // @IsEmail()
  // readonly email: string;
  //
  // @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  // @IsNotEmpty()
  // @IsString()
  // readonly password: string;
}
