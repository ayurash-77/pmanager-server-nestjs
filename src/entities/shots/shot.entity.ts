import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';
import { User } from '@app/entities/users/user.entity';
import { Reel } from '@app/entities/reels/reel.entity';
import { Status } from '@app/entities/statuses/status.entity';

@Entity({ name: 'shots' })
export class Shot {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'MFP_010', description: 'Код шота' })
  @Column()
  code: string;

  @ApiProperty({ example: '100', description: 'Хронометраж шота в кадрах' })
  @Column({ nullable: true })
  duration?: number;

  @ApiProperty({ example: '50%', description: 'Прогресс' })
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => Status, status => status.shots, { eager: true })
  status: Status;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.shots)
  project: Project;

  @ManyToMany(() => Reel)
  @JoinTable({ name: 'reels_shots' })
  reels: Reel[];

  @ManyToOne(() => User, user => user.createdShots, { eager: true })
  createdBy: User;
}
