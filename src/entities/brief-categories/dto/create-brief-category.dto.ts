import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBriefCategoryDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  @ApiProperty({ example: 'Cleanups', description: 'Название категории брифа' })
  name: string;

  @IsNotEmpty({ message: `code' не может быть пустым` })
  @IsNumber({}, { message: `поле 'code' должно быть числом` })
  @ApiProperty({ example: 'Cleanups', description: 'Название категории брифа' })
  code: number;

  @IsString({ message: `поле 'details' должно быть строкой` })
  @IsOptional()
  @ApiProperty({ example: 'Клинапы', description: 'Описание категории брифа' })
  @ApiPropertyOptional()
  details?: string;
}
