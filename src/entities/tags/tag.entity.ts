import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tags' })
export class Tag {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Overview', description: 'Имя тега' })
  @Column({ unique: true })
  name: string;
}
