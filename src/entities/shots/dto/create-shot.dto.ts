import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShotDto {
  @IsNumber({}, { message: `поле 'projectId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID проекта' })
  projectId: number;

  @IsNumber({}, { message: `поле 'reelId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID ролика' })
  reelId: number;

  @IsOptional()
  @IsNumber({}, { message: `поле 'duration' должно быть числом` })
  @ApiProperty({ example: '100', description: 'Хронометраж шота в кадрах' })
  @ApiPropertyOptional()
  duration?: number;

  @IsNotEmpty({ message: `поле 'number' не может быть пустым` })
  @IsNumberString({ message: `поле 'number' должно быть фифрами` })
  @ApiProperty({ example: '010', description: 'Номер шота' })
  number: string;
}
