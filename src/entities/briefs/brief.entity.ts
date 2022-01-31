import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';
import { User } from '@app/entities/users/user.entity';

@Entity({ name: 'briefs' })
export class Brief {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Cleanups_v01', description: 'Название брифа' })
  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: '17.01.2022_Clean up&CG.pptx', description: 'Оригинальное название брифа' })
  @Column()
  originalName: string;

  @ApiProperty({ example: 'Cleanups', description: 'Категория брифа' })
  @Column({ default: 'Common' })
  category?: string;

  @ApiProperty({ example: 'true', description: 'Утвержден или нет' })
  @Column({ default: false })
  approved: boolean;

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

  // @ApiProperty({ example: '1', description: 'ID проекта' })
  // @Column()
  // projectId: number;

  @ApiProperty({ example: 'project***/briefs/briefName.ext', description: 'Путь до файла' })
  @Column({ unique: true })
  url: string;

  @ManyToOne(() => Project, project => project.briefs)
  project: Project;

  @ManyToOne(() => User, user => user.createdBriefs)
  createdBy: User;

  @ManyToOne(() => User, user => user.updatedBriefs)
  updatedBy: User;
}