import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  name: string;

  @IsString({ message: `поле 'details' должно быть строкой` })
  @IsOptional()
  @ApiProperty({ example: 'Монтаж', description: 'Описание вида работ' })
  @ApiPropertyOptional()
  details?: string;
}
