import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Shot } from '@app/entities/shots/shot.entity';

export class CreateReelDto {
  // @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  // @IsString({ message: `поле 'name' должно быть строкой` })
  // name: string;

  @IsNumber({}, { message: `поле 'projectId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID проекта' })
  projectId: number;

  @IsNumber({}, { message: `поле 'reelsTypeId' должно быть числом` })
  @ApiProperty({ example: '1', description: 'ID типа ролика' })
  reelsTypeId: number;

  @IsNumber({}, { message: `поле 'duration' должно быть числом` })
  @ApiProperty({ example: '10', description: 'Хронометраж ролика в секундах' })
  duration: number;

  @IsOptional()
  @IsBoolean({ message: `highPriority' должно быть true / false` })
  @ApiProperty({ example: 'true', description: 'Высокий приоритет' })
  @ApiPropertyOptional()
  highPriority?: boolean;

  // @IsOptional()
  // @IsArray({ message: `поле 'shotsIds' должно быть массивом чисел` })
  // @ApiProperty({ example: '1', description: 'IDs шотов' })
  // @ApiPropertyOptional()
  // shotsIds?: number[];

  @IsOptional()
  @ApiPropertyOptional()
  shots?: Shot[];

  @IsOptional()
  @ApiPropertyOptional()
  shotsIds?: number[];

  // @IsNotEmpty({ message: `поле 'code' не может быть пустым` })
  // @IsString({ message: `поле 'code' должно быть строкой` })
  // code: string;
}
