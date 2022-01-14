import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobModel } from '@app/jobs/models/job.model';
import { Role } from '@app/roles/entities/role.entity';

@Entity({ name: 'jobs' })
export class Job extends JobModel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;

  // @ManyToMany(() => Role, role => role.jobs)
  // roles: Role[];

}

