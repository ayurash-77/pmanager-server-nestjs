import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsNotEmpty({ message: `поле 'title' не может быть пустым` })
  @IsString({ message: `поле 'title' должно быть строкой` })
  @ApiProperty({ example: 'Tele2-Market', description: 'Название проекта' })
  title: string;

  @IsOptional()
  @ApiProperty({ example: '20220216', description: 'Дата старта проекта' })
  @ApiPropertyOptional()
  startAt?: Date;

  @IsOptional()
  @ApiProperty({ example: '20220216', description: 'Планируемая дата сдачи проекта' })
  @ApiPropertyOptional()
  deadline?: Date;

  @IsOptional()
  @ApiProperty({ example: '20220216', description: 'Дата фактической сдачи проекта' })
  @ApiPropertyOptional()
  doneAt?: Date;

  @IsOptional()
  @IsString({ message: `поле 'details' должно быть строкой` })
  @ApiProperty({ example: 'Очень важный проект', description: 'Описание проекта' })
  @ApiPropertyOptional()
  details?: string;

  @IsOptional()
  @IsBoolean({ message: `highPriority' должно быть true / false` })
  @ApiProperty({ example: 'true', description: 'Высокий приоритет' })
  @ApiPropertyOptional()
  highPriority?: boolean;

  @IsOptional()
  @IsInt({ message: `поле 'progress' должно быть числом` })
  @Min(0, { message: `поле 'progress' не должно быть меньше 0` })
  @Max(100, { message: `поле 'progress' должно быть меньше 100` })
  @ApiProperty({ example: '50%', description: 'Прогресс' })
  @ApiPropertyOptional()
  progress?: number;

  @IsOptional()
  @IsString({ message: `поле 'image' должно быть строкой` })
  @ApiProperty({
    example: 'upload/***/projectThumbnail_****.jpg',
    description: 'Путь до изображения проекта на сервере',
  })
  @ApiPropertyOptional()
  image?: string;
}
