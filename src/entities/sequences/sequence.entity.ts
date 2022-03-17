import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';
import { User } from '@app/entities/users/user.entity';
import { Reel } from '@app/entities/reels/reel.entity';

@Entity({ name: 'sequences' })
export class Sequence {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '10 sec', description: 'Хронометраж' })
  @Column()
  name: string;

  @ApiProperty({ example: 'MFP_10s', description: 'Код хронометража' })
  @Column()
  code: string;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.sequences)
  project: Project;

  @ApiProperty({ example: '1', description: 'ID ролика' })
  @Column()
  reelId: number;

  @ManyToOne(() => Reel, reel => reel.sequences)
  reel: Reel;

  @ManyToOne(() => User, user => user.createdSequence, { eager: true })
  createdBy: User;
}
