import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@mail.com', description: 'Email пользователя' })
  @Column()
  email: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @Column()
  password: string;
}
