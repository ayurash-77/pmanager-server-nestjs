import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';
import { User } from '@app/entities/users/user.entity';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { Shot } from '@app/entities/shots/shot.entity';

@Entity({ name: 'sequences' })
export class Reel {
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

  @ManyToOne(() => Project, project => project.reels)
  project: Project;

  @ApiProperty({ example: '1', description: 'ID типа ролика' })
  @Column()
  reelsTypeId: number;

  @ManyToOne(() => ReelsType, reelsType => reelsType.reels)
  reelsType: ReelsType;

  @OneToMany(() => Shot, shot => shot.reel, { eager: true })
  shots: Shot[];

  @ManyToOne(() => User, user => user.createdSequences, { eager: true })
  createdBy: User;
}
