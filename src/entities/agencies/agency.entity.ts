import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';

@Entity({ name: 'agencies' })
export class Agency {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ogilvi', description: 'Имя агенства' })
  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'ООО "Огилви энд Мейзер"', description: 'Альтернативное имя агенства' })
  @Column({ nullable: true })
  altName?: string;

  @OneToMany(() => Project, project => project.agency)
  projects: Project[];
}
