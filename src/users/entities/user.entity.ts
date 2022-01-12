import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'vasyapupkin', description: 'Username' })
  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'user@mail.com', description: 'Email пользователя' })
  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @IsNotEmpty()
  @IsString()
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'Вася', description: 'Имя пользователя' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: 'Пупкин', description: 'Фамилия пользователя' })
  @Column({ nullable: true })
  surname: string;

  @ApiProperty({ example: '9648889900', description: 'Мобильный телефон' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: '/path/aaa.jpg', description: 'Фото пользователя' })
  @Column({ nullable: true })
  image: string;

  @BeforeInsert()
  // @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 5);
  }
}
