import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'Описание', description: 'Имя тега' })
  @IsString({ message: 'Имя тега должно быть строкой' })
  readonly name: string;
}
