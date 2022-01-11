import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@mail.com', description: 'Email пользователя' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(
      `Добавлен пользователь: { id: ${this.id}, email: ${this.email}, password: ${this.password} }`,
    );
  }

  @AfterUpdate()
  logUpdate() {
    console.log(
      `Обновлен пользователь: { id: ${this.id}, email: ${this.email}, password: ${this.password} }`,
    );
  }

  @AfterRemove()
  logRemove() {
    console.log(`Удален пользователь: { id: ${this.id}, email: ${this.email}, password: ${this.password} }`);
  }
}
