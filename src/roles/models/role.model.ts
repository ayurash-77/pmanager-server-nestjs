import { Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleModel {
  @ApiProperty({ example: 'Admin', description: 'Название роли' })
  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ nullable: true })
  details?: string;
}
