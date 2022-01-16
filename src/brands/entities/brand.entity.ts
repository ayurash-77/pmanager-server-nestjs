import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BrandModel } from '@app/brands/models/brand.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'brands' })
export class Brand extends BrandModel {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  altName?: string;
}
