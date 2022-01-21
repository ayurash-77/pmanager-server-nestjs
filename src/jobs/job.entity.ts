import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'jobs' })
export class Job {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Editing', description: 'Название вида работ' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'Монтаж', description: 'Описание вида работ' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;
}
