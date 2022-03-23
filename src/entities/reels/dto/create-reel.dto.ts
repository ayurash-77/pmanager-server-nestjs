import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  // @IsNotEmpty({ message: `поле 'code' не может быть пустым` })
  // @IsString({ message: `поле 'code' должно быть строкой` })
  // code: string;
}
