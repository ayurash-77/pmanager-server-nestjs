import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateStatusDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  @ApiProperty({ example: 'Overview', description: 'Имя тега' })
  readonly name: string;

  @IsNotEmpty({ message: `code 'name' не может быть пустым` })
  @IsNumber({}, { message: `code 'name' должно быть строкой` })
  @ApiProperty({ example: '1', description: 'Код статуса' })
  code: number;
}
