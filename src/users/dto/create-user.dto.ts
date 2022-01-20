import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '@app/users/users.costants';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: `поле 'username' не может быть пустым` })
  @IsString({ message: `поле 'username' должно быть строкой` })
  @ApiProperty({ example: 'vasyapupkin', description: 'Имя пользователя' })
  username: string;

  @IsNotEmpty({ message: `поле 'email' не может быть пустым` })
  @IsEmail({ message: `поле 'email' в некорректном формате` })
  @ApiProperty({ example: 'user@mail.com', description: 'Email пользователя' })
  email: string;

  @IsNotEmpty({ message: `поле 'password' не может быть пустым` })
  @IsString({ message: `поле 'password' должно быть строкой` })
  @Length(PASSWORD_MIN, PASSWORD_MAX, {
    message: `поле 'password' должно быть от ${PASSWORD_MIN} до ${PASSWORD_MAX} символов`,
  })
  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  password: string;

  @IsOptional()
  @IsString({ message: `поле 'name' должно быть строкой` })
  @ApiProperty({ example: 'Вася', description: 'Имя' })
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsString({ message: `поле 'surname' должно быть строкой` })
  @ApiProperty({ example: 'Пупкин2', description: 'Фамилия' })
  @ApiPropertyOptional()
  surname?: string;

  @IsOptional()
  @IsPhoneNumber('RU', { message: `поле 'phone' должно быть из 10-ти значным числом` })
  @ApiProperty({ example: '9648889900', description: 'Мобильный телефон' })
  @ApiPropertyOptional()
  phone?: string;

  @IsOptional()
  @IsString({ message: `поле 'image' должно быть строкой` })
  @ApiProperty({ example: '/path/aaa.jpg', description: 'Фото' })
  @ApiPropertyOptional()
  image?: string;
}
