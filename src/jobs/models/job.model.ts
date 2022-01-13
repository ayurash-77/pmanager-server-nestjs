import { Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class JobModel {
  @ApiProperty({ example: 'Editing', description: 'Название вида работ' })
  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'Монтаж', description: 'Описание вида работ' })
  @Column({ nullable: true })
  details?: string;
}
