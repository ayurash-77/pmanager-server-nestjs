import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBriefDto {
  @ApiProperty({ example: 'Cleanups_v01', description: 'Название брифа' })
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  name: string;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @IsNumber()
  projectId: number;

  @ApiProperty({ example: 'Бриф на клинапы', description: 'Описание брифа' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: `поле 'details' должно быть строкой` })
  details?: string;
}
