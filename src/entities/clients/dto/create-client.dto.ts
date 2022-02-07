import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  name: string;

  @IsOptional()
  @IsString({ message: `поле 'altName' должно быть строкой` })
  altName?: string;
}
