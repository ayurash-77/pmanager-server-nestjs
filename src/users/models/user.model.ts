import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class UserModel {
  @ApiProperty({ example: 'vasyapupkin', description: 'Имя пользователя' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'user@mail.com', description: 'Email пользователя' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Является ли пользователь администратором' })
  @Column({ default: false })
  isAdmin: boolean;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'Вася', description: 'Имя' })
  @Column({ nullable: true })
  name?: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'Пупкин2', description: 'Фамилия' })
  @Column({ nullable: true })
  surname?: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: '9648889900', description: 'Мобильный телефон' })
  @Column({ nullable: true })
  phone?: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: '/path/aaa.jpg', description: 'Фото' })
  @Column({ nullable: true })
  image?: string;
}
