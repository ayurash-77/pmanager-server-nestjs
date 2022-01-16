import { Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AgencyModel {
  @ApiProperty({ example: 'Ogilvi', description: 'Имя агенства' })
  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'ООО "Огилви энд Мейзер"', description: 'Альтернативное имя агенства' })
  @Column({ nullable: true })
  altName?: string;
}
