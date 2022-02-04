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

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: 'true', description: 'Утвержден или нет' })
  @ApiPropertyOptional()
  approved?: boolean;

  @IsNotEmpty({ message: `поле 'file' не может быть пустым` })
  @IsString({ message: `поле 'file' должно быть строкой` })
  @ApiProperty({ example: 'project***/briefs/briefName.ext', description: 'Путь до файла' })
  url: string;

  @IsString({ message: `поле 'details' должно быть строкой` })
  @IsOptional()
  @ApiProperty({ example: 'Бриф на клинапы', description: 'Описание брифа' })
  @ApiPropertyOptional()
  details?: string;

  @IsNumber({}, { message: `поле 'categoryId' должно быть числом` })
  @IsOptional()
  @ApiProperty({ example: '1', description: 'ID категории брифа' })
  @ApiPropertyOptional()
  categoryId?: number;

  @IsNumber({}, { message: `поле 'projectId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID проекта' })
  @IsNumber()
  projectId: number;
}
