import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BrandModel } from '@app/brands/models/brand.model';

export class CreateBrandDto extends BrandModel {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  name: string;

  @IsOptional()
  @IsString({ message: `поле 'altName' должно быть строкой` })
  altName?: string;
}
