import { IsAlphanumeric, IsNotEmpty, IsNumber, IsString, IsUppercase, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReelsTypeDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  name: string;

  @IsNotEmpty({ message: `поле 'code' не может быть пустым` })
  @IsAlphanumeric()
  @IsString({ message: `поле 'code' должно быть строкой` })
  @IsUppercase({ message: `поле 'code' должно быть в верхнем регистре` })
  @Length(2, 4)
  code: string;

  @IsNumber({}, { message: `поле 'projectId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID проекта' })
  projectId: number;
}
