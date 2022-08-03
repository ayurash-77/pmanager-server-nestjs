import {
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';
import { User } from '@app/entities/users/user.entity';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { Shot } from '@app/entities/shots/shot.entity';
import { Status } from '@app/entities/statuses/status.entity';
import { Post } from '@app/entities/posts/post.entity';

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

  @ApiProperty({ example: 'true', description: 'Высокий приоритет' })
  @ApiPropertyOptional()
  @Column({ default: false })
  highPriority: boolean;

  @ApiProperty({ example: '50%', description: 'Прогресс' })
  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => Status, status => status.reels, { eager: true })
  status: Status;

  @ApiProperty({ example: '1', description: 'ID проекта' })
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.reels, { onDelete: 'CASCADE' })
  project: Project;

  @ApiProperty({ example: '1', description: 'ID типа ролика' })
  @Column()
  reelsTypeId: number;

  @ManyToOne(() => ReelsType, reelsType => reelsType.reels, { onDelete: 'CASCADE' })
  reelsType: ReelsType;
  @AfterLoad()
  updateCode() {
    const duration = this.duration.toString().padStart(2, '0');
    this.code = `${this.reelsType?.code}_${duration}s`;
    this.name = `${this.reelsType?.code} ${duration} sec`;
  }

  @ApiProperty({ example: '1', description: 'IDs шотов' })
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
  })
  shotsIds: Array<number>;

  // @OneToMany(() => Post, post => post.reel)
  // posts: Post[];

  @ManyToMany(() => Shot, { eager: true })
  @JoinTable({ name: 'reels_shots' })
  shots: Shot[];

  @ManyToMany(() => Post)
  @JoinTable({ name: 'posts_reels' })
  posts: Post[];

  @ManyToOne(() => User, user => user.createdSequences, { eager: true })
  createdBy: User;
}
