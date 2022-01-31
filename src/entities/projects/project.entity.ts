import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@app/entities/users/user.entity';
import { Brief } from '@app/entities/briefs/brief.entity';

@Entity({ name: 'projects' })
export class Project {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Tele2-Market', description: 'Название проекта' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Tele2-Market', description: 'Название проекта' })
  @Column({ default: '' })
  homeDir: string;

  @ApiProperty({ example: '20220216', description: 'Дата создания проекта' })
  @ApiPropertyOptional()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty({ example: '20220216', description: 'Дата последнего обновления проекта' })
  @UpdateDateColumn()
  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiProperty({ example: '20220216', description: 'Дата старта проекта' })
  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  startAt?: Date;

  @ApiProperty({ example: '20220216', description: 'Планируемая дата сдачи проекта' })
  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  deadline?: Date;

  @ApiProperty({ example: '20220216', description: 'Дата фактической сдачи проекта' })
  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  doneAt?: Date;

  @ApiProperty({ example: 'Очень важный проект', description: 'Описание проекта' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;

  @ManyToOne(() => User, user => user.projects, { eager: true })
  owner: User;

  @OneToMany(() => Brief, brief => brief.project)
  briefs: Brief[];
}
