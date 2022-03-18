import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { User } from '@app/entities/users/user.entity';
import { Reel } from '@app/entities/reels/reel.entity';

@Entity({ name: 'shots' })
export class Shot {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'MFP_010', description: 'Код шота' })
  @Column()
  code: string;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.shots)
  project: Project;

  @ApiProperty({ example: '1', description: 'ID типа ролика' })
  @Column()
  reelsTypeId: number;

  @ManyToOne(() => ReelsType, reelsType => reelsType.shots)
  reelsType: ReelsType;

  @ApiProperty({ example: '1', description: 'ID ролика' })
  @Column()
  reelId: number;

  @ManyToOne(() => Reel, reel => reel.shots)
  reel: Reel;

  @ManyToOne(() => User, user => user.createdShots, { eager: true })
  createdBy: User;
}
