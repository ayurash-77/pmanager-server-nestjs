import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@app/entities/roles/role.entity';
import { Project } from '@app/entities/projects/project.entity';
import { Brief } from '@app/entities/briefs/brief.entity';
import { Post } from '@app/entities/posts/post.entity';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { Reel } from '@app/entities/reels/reel.entity';
import { Shot } from '@app/entities/shots/shot.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'vasyapupkin', description: 'Имя пользователя' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'user@mail.com', description: 'Email пользователя' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'false', description: 'Является ли администратором' })
  @Column({ default: false })
  isAdmin: boolean;

  @ApiProperty({ example: 'Вася', description: 'Имя' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  name?: string;

  @ApiProperty({ example: 'Пупкин2', description: 'Фамилия' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  surname?: string;

  @ApiProperty({ example: '9648889900', description: 'Мобильный телефон' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty({ example: '/path/aaa.jpg', description: 'Фото' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => Role, role => role.users, { eager: true })
  role: Role;

  @OneToMany(() => Project, project => project.owner)
  projects: Project[];

  @OneToMany(() => Brief, brief => brief.createdBy)
  createdBriefs: Brief[];

  @OneToMany(() => Brief, brief => brief.updatedBy)
  updatedBriefs: Brief[];

  @OneToMany(() => Post, post => post.createdBy)
  createdPosts: Post[];

  @OneToMany(() => ReelsType, reel => reel.createdBy)
  createdReels: ReelsType[];

  @OneToMany(() => Reel, sequence => sequence.createdBy)
  createdSequences: Reel[];

  @OneToMany(() => Shot, shot => shot.createdBy)
  createdShots: Shot[];
}
