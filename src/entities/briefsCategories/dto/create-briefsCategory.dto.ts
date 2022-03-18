import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBriefsCategoryDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  @ApiProperty({ example: 'Cleanups', description: 'Название категории брифа' })
  name: string;

  @IsNotEmpty({ message: `code' не может быть пустым` })
  @IsInt({ message: `поле 'code' должно быть числом` })
  @Min(1, { message: `поле 'code' должно быть больше 0` })
  @ApiProperty({ example: 'Cleanups', description: 'Название категории брифа' })
  code: number;

  @IsString({ message: `поле 'details' должно быть строкой` })
  @IsOptional()
  @ApiProperty({ example: 'Клинапы', description: 'Описание категории брифа' })
  @ApiPropertyOptional()
  details?: string;
}
