import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/entities/users/user.entity';
import { Project } from '@app/entities/projects/project.entity';
import { Reel } from '@app/entities/reels/reel.entity';
import { Status } from '@app/entities/statuses/status.entity';

@Entity({ name: 'reelsTypes' })
export class ReelsType {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'MultiCard for pensioners', description: 'Тип ролика' })
  @Column()
  name: string;

  @ApiProperty({ example: 'MFP', description: 'Код типа ролика' })
  @Column()
  code: string;

  @ApiProperty({ example: '50%', description: 'Прогресс' })
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => Status, status => status.reelsTypes, { eager: true })
  status: Status;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.reelsTypes, { onDelete: 'CASCADE' })
  project: Project;

  @OneToMany(() => Reel, reel => reel.reelsType)
  reels: Reel[];

  @ManyToOne(() => User, user => user.createdReels, { eager: true })
  createdBy: User;
}
