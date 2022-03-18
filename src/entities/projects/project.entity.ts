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
import { Status } from '@app/entities/statuses/status.entity';
import { Brand } from '@app/entities/brands/brand.entity';
import { Agency } from '@app/entities/agencies/agency.entity';
import { Client } from '@app/entities/clients/client.entity';
import { Post } from '@app/entities/posts/post.entity';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { Reel } from '@app/entities/reels/reel.entity';
import { Shot } from '@app/entities/shots/shot.entity';

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

  @ApiProperty({ example: 'true', description: 'Высокий приоритет' })
  @ApiPropertyOptional()
  @Column({ default: false })
  highPriority: boolean;

  @ApiProperty({ example: '50%', description: 'Прогресс' })
  @ApiPropertyOptional()
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => User, user => user.projects, { eager: true })
  owner: User;

  @OneToMany(() => Brief, brief => brief.project, { eager: true })
  briefs: Brief[];

  @ManyToOne(() => Status, status => status.projects, { eager: true })
  status: Status;

  @ManyToOne(() => Brand, brand => brand.projects, { eager: true })
  brand: Brand;

  @ManyToOne(() => Client, client => client.projects, { eager: true })
  client: Client;

  @ManyToOne(() => Agency, agency => agency.projects, { eager: true })
  agency: Agency;

  @OneToMany(() => Post, post => post.project, { eager: true })
  posts: Post[];

  @OneToMany(() => ReelsType, reelsType => reelsType.project, { eager: true })
  reelsTypes: ReelsType[];

  @OneToMany(() => Reel, reel => reel.project, { eager: true })
  reels: Reel[];

  @OneToMany(() => Shot, shot => shot.project, { eager: true })
  shots: Shot[];
}
