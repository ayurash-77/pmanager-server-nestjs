import { IsNotEmpty, IsString } from 'class-validator';
import { TagModel } from '@app/tags/models/tag.model';

export class CreateTagDto extends TagModel {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  readonly name: string;
}
