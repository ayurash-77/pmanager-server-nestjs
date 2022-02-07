import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from '@app/entities/projects/project.entity';

@Entity({ name: 'brands' })
export class Brand {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Fruktovy Sad', description: 'Имя брэнда' })
  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'Фруктовый сад', description: 'Альтернативное имя брэнда' })
  @Column({ nullable: true })
  altName?: string;

  @OneToMany(() => Project, project => project.brand)
  projects: Project[];
}
