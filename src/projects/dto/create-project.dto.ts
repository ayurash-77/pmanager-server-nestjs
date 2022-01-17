import { ProjectModel } from '@app/projects/models/project.model';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto extends ProjectModel {
  @IsNotEmpty({ message: `поле 'title' не может быть пустым` })
  @IsString({ message: `поле 'title' должно быть строкой` })
  title: string;

  @IsOptional()
  @IsString({ message: `поле 'details' должно быть строкой` })
  details?: string;
}
