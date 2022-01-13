import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'username | user@mail.ru', description: 'Имя пользователя | Email' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
