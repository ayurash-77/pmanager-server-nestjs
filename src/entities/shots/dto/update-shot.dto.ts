import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateShotDto } from './create-shot.dto';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateShotDto extends PartialType(CreateShotDto) {
  @IsOptional()
  @IsInt({ message: `поле 'progress' должно быть числом` })
  @Min(0, { message: `поле 'progress' не должно быть меньше 0` })
  @Max(100, { message: `поле 'progress' должно быть меньше 100` })
  @ApiProperty({ example: '50%', description: 'Прогресс' })
  @ApiPropertyOptional()
  progress?: number;
}
