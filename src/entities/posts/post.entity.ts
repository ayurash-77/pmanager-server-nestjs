import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tag } from '@app/entities/tags/tag.entity';
import { User } from '@app/entities/users/user.entity';
import { Project } from '@app/entities/projects/project.entity';
import { Reel } from '@app/entities/reels/reel.entity';
import { Shot } from '@app/entities/shots/shot.entity';

@Entity({ name: 'posts' })
export class Post {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок поста' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ example: 'Текст', description: 'Текст поста' })
  @Column()
  message: string;

  @ApiProperty({ example: '20220216', description: 'Дата создания проекта' })
  @ApiPropertyOptional()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty({ example: '20220216', description: 'Дата последнего обновления проекта' })
  @UpdateDateColumn()
  @ApiPropertyOptional()
  updatedAt?: Date;

  @ManyToOne(() => User, user => user.createdPosts, { eager: true })
  createdBy: User;

  @ManyToMany(() => User, { eager: true })
  @JoinTable({ name: 'posts_users' })
  team: User[];

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({ name: 'posts_tags' })
  tags: Tag[];

  // @ApiProperty({ example: '1', description: 'ID ролика' })
  // @Column({ nullable: true })
  // reelId: number;

  // @ManyToOne(() => Reel, reel => reel.posts, { onDelete: 'CASCADE' })
  // reel: Reel;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToMany(() => Reel, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'posts_reels' })
  reels: Reel[];

  @ManyToMany(() => Shot, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'posts_shots' })
  shots: Shot[];

  @ManyToOne(() => Project, project => project.posts, { onDelete: 'CASCADE' })
  project: Project;
}
