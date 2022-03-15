import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/entities/users/user.entity';
import { Project } from '@app/entities/projects/project.entity';

@Entity({ name: 'reels' })
export class Reel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'MultiCard for pensioners', description: 'Тематика ролика' })
  @Column()
  name: string;

  @ApiProperty({ example: 'MFP', description: 'Код ролика' })
  @Column()
  code: string;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.reels)
  project: Project;

  @ManyToOne(() => User, user => user.createdReels, { eager: true })
  createdBy: User;
}
