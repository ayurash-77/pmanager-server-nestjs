import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  @ApiProperty({ example: 'Overview', description: 'Имя тега' })
  readonly name: string;
}
