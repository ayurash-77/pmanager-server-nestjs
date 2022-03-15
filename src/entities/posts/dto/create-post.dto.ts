import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString({ message: `поле 'title' должно быть строкой` })
  @ApiProperty({ example: 'Заголовок', description: 'Заголовок поста' })
  @ApiPropertyOptional()
  title: string;

  @IsNotEmpty({ message: `поле 'message' не может быть пустым` })
  @IsString({ message: `поле 'message' должно быть строкой` })
  @ApiProperty({ example: 'Текст', description: 'Текст поста' })
  message: string;

  @IsNumber({}, { message: `поле 'projectId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID проекта' })
  projectId: number;

  @IsOptional()
  @IsArray({ message: `поле 'tagsIds' должно быть массивом чисел` })
  @ApiProperty({ example: '1', description: 'ID тега' })
  @ApiPropertyOptional()
  tagsIds?: number[];
}
