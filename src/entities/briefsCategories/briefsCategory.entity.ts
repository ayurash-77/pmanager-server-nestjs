import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Brief } from '@app/entities/briefs/brief.entity';

@Entity({ name: 'briefsCategories' })
export class BriefsCategory {
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

  @OneToMany(() => Brief, brief => brief.category)
  briefs: Brief[];
}
