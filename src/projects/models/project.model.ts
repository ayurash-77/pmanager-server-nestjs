import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectModel {
  @ApiProperty({ example: 'Tele2-Market', description: 'Название проекта' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Tele2-Market', description: 'Название проекта' })
  @Column({ default: '' })
  homeDir: string;

  @ApiProperty({ example: '20220216', description: 'Дата создания проекта' })
  @CreateDateColumn()
  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiProperty({ example: '20220216', description: 'Дата последнего обновления проекта' })
  @UpdateDateColumn()
  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiProperty({ example: '20220216', description: 'Дата старта проекта' })
  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  startAt?: Date;

  @ApiProperty({ example: '20220216', description: 'Планируемая дата сдачи проекта' })
  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  deadline?: Date;

  @ApiProperty({ example: '20220216', description: 'Дата фактической сдачи проекта' })
  @ApiPropertyOptional()
  @Column({ type: 'timestamptz', nullable: true })
  doneAt?: Date;

  @ApiProperty({ example: 'Очень важный проект', description: 'Описание проекта' })
  @ApiPropertyOptional()
  @Column({ nullable: true })
  details?: string;

  // @BeforeInsert()
  // async setHomeDir() {
  //   this.homeDir = this.title.replace(/ /g, '-') + '_' + moment().format('YYYY.MM.DD');
  //   console.log(this.homeDir);
  // }
}
