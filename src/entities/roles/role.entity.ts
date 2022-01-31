import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Job } from '@app/entities/jobs/job.entity';
import { JoinTable } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Admin', description: 'Название роли' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;

  // @ManyToMany(() => Job, { eager: true })
  @ManyToMany(() => Job)
  @JoinTable({ name: 'roles_jobs' })
  jobs: Job[];
}
