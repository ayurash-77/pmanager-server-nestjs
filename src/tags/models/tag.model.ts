import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class TagModel {
  @ApiProperty({ example: 'Overview', description: 'Имя тега' })
  @Column({ unique: true })
  name: string;
}
