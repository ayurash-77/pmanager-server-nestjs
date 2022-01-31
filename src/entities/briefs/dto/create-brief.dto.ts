import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBriefDto {
  @IsString({ message: `поле 'name' должно быть строкой` })
  @IsOptional()
  @ApiProperty({ example: 'Cleanups_v01', description: 'Название брифа' })
  @ApiPropertyOptional()
  name?: string;

  @IsNotEmpty({ message: `поле 'originalName' не может быть пустым` })
  @IsString({ message: `поле 'originalName' должно быть строкой` })
  @ApiProperty({ example: '17.01.2022_Clean up&CG.pptx', description: 'Оригинальное название брифа' })
  originalName: string;

  @IsString({ message: `поле 'category' должно быть строкой` })
  @IsOptional()
  @ApiProperty({ example: 'Cleanups', description: 'Категория брифа' })
  @ApiPropertyOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: 'true', description: 'Утвержден или нет' })
  @ApiPropertyOptional()
  approved?: boolean;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @IsNumber()
  projectId: number;

  @IsNotEmpty({ message: `поле 'file' не может быть пустым` })
  @IsString({ message: `поле 'file' должно быть строкой` })
  @ApiProperty({ example: 'project***/briefs/briefName.ext', description: 'Путь до файла' })
  url: string;

  @IsString({ message: `поле 'details' должно быть строкой` })
  @IsOptional()
  @ApiProperty({ example: 'Бриф на клинапы', description: 'Описание брифа' })
  @ApiPropertyOptional()
  details?: string;
}
