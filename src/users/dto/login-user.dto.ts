import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Email пользователя' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
