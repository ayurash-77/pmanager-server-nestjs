import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReelDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  name: string;

  @IsNotEmpty({ message: `поле 'code' не может быть пустым` })
  @IsString({ message: `поле 'code' должно быть строкой` })
  code: string;

  @IsNumber({}, { message: `поле 'reelsTypeId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID ролика' })
  reelsTypeId: number;

  @IsNumber({}, { message: `поле 'projectId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID проекта' })
  projectId: number;
}
