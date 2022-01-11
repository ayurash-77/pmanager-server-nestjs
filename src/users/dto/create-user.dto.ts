import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Email пользователя' })
  @IsEmail({ message: 'Должен быть валидный формат Email' })
  readonly email: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @IsString({ message: 'Пароль должен быть строкой' })
  readonly password: string;
}
