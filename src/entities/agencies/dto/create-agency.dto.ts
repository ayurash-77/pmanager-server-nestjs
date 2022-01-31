import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAgencyDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  @ApiProperty({ example: 'Ogilvi', description: 'Имя агенства' })
  name: string;

  @IsOptional()
  @IsString({ message: `поле 'altName' должно быть строкой` })
  @ApiPropertyOptional()
  @ApiProperty({ example: 'ООО "Огилви энд Мейзер"', description: 'Альтернативное имя агенства' })
  altName?: string;
}
