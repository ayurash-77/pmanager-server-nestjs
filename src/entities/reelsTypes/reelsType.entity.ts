import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/entities/users/user.entity';
import { Project } from '@app/entities/projects/project.entity';
import { Reel } from '@app/entities/reels/reel.entity';
import { Shot } from '@app/entities/shots/shot.entity';

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

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.reelsTypes)
  project: Project;

  @OneToMany(() => Reel, reel => reel.reelsType, { eager: true })
  reels: Reel[];

  @OneToMany(() => Shot, shot => shot.reel, { eager: true })
  shots: Shot[];

  @ManyToOne(() => User, user => user.createdReels, { eager: true })
  createdBy: User;
}
