import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserModel } from '@app/users/models/user.model';
import { Role } from '@app/roles/entities/role.entity';

@Entity({ name: 'users' })
export class User extends UserModel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  name?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  surname?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  phone?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  image?: string;

  // @ManyToMany(() => Role, { eager: true })
  @ManyToMany(() => Role)
  @JoinTable({ name: 'users_roles' })
  roles: Role[];
}
