import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';
import { User } from '@app/entities/users/user.entity';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { Shot } from '@app/entities/shots/shot.entity';
import { Status } from '@app/entities/statuses/status.entity';

@Entity({ name: 'reels' })
export class Reel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'MFP 10 sec', description: 'Имя ролика' })
  @Column()
  name: string;

  @ApiProperty({ example: '10', description: 'Хронометраж' })
  @Column()
  duration: number;

  @ApiProperty({ example: 'MFP_10s', description: 'Код ролика' })
  @Column()
  code: string;

  @ApiProperty({ example: '50%', description: 'Прогресс' })
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => Status, status => status.reels, { eager: true })
  status: Status;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.reels)
  project: Project;

  @ApiProperty({ example: '1', description: 'ID типа ролика' })
  @Column()
  reelsTypeId: number;

  @ManyToOne(() => ReelsType, reelsType => reelsType.reels)
  reelsType: ReelsType;

  @ManyToMany(() => Shot, { eager: true })
  @JoinTable({ name: 'reels_shots' })
  shots: Shot[];

  @ManyToOne(() => User, user => user.createdSequences, { eager: true })
  createdBy: User;
}
