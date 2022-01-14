import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleModel } from '@app/roles/models/role.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Job } from '@app/jobs/entities/job.entity';
import { JoinTable } from 'typeorm';

@Entity({ name: 'roles' })
export class Role extends RoleModel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;

  // @ManyToMany(() => Job, job => job.roles)
  @ManyToMany(() => Job)
  // @JoinTable({ name: 'roles_jobs', joinColumn: { name: 'roleId' }, inverseJoinColumn: { name: 'jobId' } })
  @JoinTable({ name: 'roles_jobs' })
  jobs: Job[];
}
