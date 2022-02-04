import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';

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

  @OneToMany(() => Project, project => project.status)
  projects: Project[];
}
