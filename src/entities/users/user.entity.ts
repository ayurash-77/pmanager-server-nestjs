import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@app/entities/roles/role.entity';
import { Project } from '@app/entities/projects/project.entity';
import { Brief } from '@app/entities/briefs/brief.entity';

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

  // @ManyToMany(() => Role, { eager: true })
  @ManyToMany(() => Role, { eager: true })
  @JoinTable({ name: 'users_roles' })
  roles: Role[];

  @OneToMany(() => Project, project => project.owner)
  projects: Project[];

  @OneToMany(() => Brief, brief => brief.createdBy)
  createdBriefs: Brief[];

  @OneToMany(() => Brief, brief => brief.updatedBy)
  updatedBriefs: Brief[];
}
