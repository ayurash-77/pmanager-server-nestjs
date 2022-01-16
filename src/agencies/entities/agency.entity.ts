import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AgencyModel } from '@app/agencies/models/agency.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'agencies' })
export class Agency extends AgencyModel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  altName?: string;
}
