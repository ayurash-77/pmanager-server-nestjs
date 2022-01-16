import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { UserModel } from '@app/users/models/user.model';
import { PASSWORD_MAX, PASSWORD_MIN } from '@app/users/users.costants';

export class CreateUserDto extends UserModel {
  @IsNotEmpty({ message: `поле 'username' не может быть пустым` })
  @IsString({ message: `поле 'username' должно быть строкой` })
  username: string;

  @IsNotEmpty({ message: `поле 'email' не может быть пустым` })
  @IsEmail({ message: `поле 'email' в некорректном формате` })
  email: string;

  @IsNotEmpty({ message: `поле 'password' не может быть пустым` })
  @IsString({ message: `поле 'password' должно быть строкой` })
  @Length(PASSWORD_MIN, PASSWORD_MAX, {
    message: `поле 'password' должно быть от ${PASSWORD_MIN} до ${PASSWORD_MAX} символов`,
  })
  password: string;

  @IsOptional()
  @IsString({ message: `поле 'name' должно быть строкой` })
  name?: string;

  @IsOptional()
  @IsString({ message: `поле 'surname' должно быть строкой` })
  surname?: string;

  @IsOptional()
  @IsPhoneNumber('RU', { message: `поле 'phone' должно быть из 10-ти значным числом` })
  phone?: string;

  @IsOptional()
  @IsString({ message: `поле 'image' должно быть строкой` })
  image?: string;
}
