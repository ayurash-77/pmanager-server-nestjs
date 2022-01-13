import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserModel } from '@app/users/models/user.model';

export class CreateUserDto extends UserModel {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
