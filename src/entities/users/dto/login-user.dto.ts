import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'username | user@mail.ru', description: 'Имя пользователя | Email' })
  @IsNotEmpty()
  @IsString({ message: `поле 'username' должно быть строкой` })
  readonly username: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @IsNotEmpty({ message: `поле 'password' не может быть пустым` })
  @IsString({ message: `поле 'password' должно быть строкой` })
  readonly password: string;
}
