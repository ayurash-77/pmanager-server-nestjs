import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { UserModel } from '@app/users/models/user.model';

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

  @BeforeInsert()
  //@BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 5);
  }
}
