import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'agencies' })
export class Agency {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ogilvi', description: 'Имя агенства' })
  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'ООО "Огилви энд Мейзер"', description: 'Альтернативное имя агенства' })
  @Column({ nullable: true })
  altName?: string;
}
