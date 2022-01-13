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
}
