import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'statuses' })
export class Status {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Active', description: 'Название статуса' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: '1', description: 'Код статуса' })
  @Column({ unique: true })
  code: number;

  @ApiProperty({ example: 'В работе', description: 'Описание статуса' })
  @ApiPropertyOptional()
  @Column({ unique: true })
  details?: string;
}
