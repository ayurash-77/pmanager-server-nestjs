import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  @ApiProperty({ example: 'Admin', description: 'Название роли' })
  name: string;

  @IsOptional()
  @IsString({ message: `поле 'details' должно быть строкой` })
  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @ApiPropertyOptional()
  details?: string;
}
