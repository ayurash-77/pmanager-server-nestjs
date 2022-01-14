import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleModel } from '@app/roles/models/role.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'roles' })
export class Role extends RoleModel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;
}
