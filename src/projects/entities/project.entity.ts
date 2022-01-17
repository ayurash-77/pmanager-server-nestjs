import { ProjectModel } from '@app/projects/models/project.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'projects' })
export class Project extends ProjectModel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  startAt?: Date;

  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  deadline?: Date;

  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  doneAt?: Date;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;
}
