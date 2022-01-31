import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'briefCategory' })
export class BriefCategory {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Cleanups', description: 'Название категории брифа' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: '1', description: 'Код категории брифа' })
  @Column({ unique: true })
  code: number;

  @ApiProperty({ example: 'Клинапы', description: 'Описание категории брифа' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;
}
