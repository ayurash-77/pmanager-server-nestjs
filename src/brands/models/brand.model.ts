import { Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BrandModel {
  @ApiProperty({ example: 'Fruktovy Sad', description: 'Имя бренда' })
  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @ApiProperty({ example: 'Фруктовый сад', description: 'Альтернативное имя бренда' })
  @Column({ nullable: true })
  altName?: string;
}
