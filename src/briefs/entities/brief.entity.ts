import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from '@app/projects/entities/project.entity';

@Entity({ name: 'briefs' })
export class Brief {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Cleanups_v01', description: 'Название брифа' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Cleanups', description: 'Категория брифа' })
  @Column()
  category: string;

  @ApiProperty({ example: '20220216', description: 'Дата создания брифа' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '20220216', description: 'Дата обновления брифа' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'Бриф на клинапы', description: 'Описание брифа' })
  @Column({ nullable: true })
  details?: string;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.briefs)
  project: Project;
}
