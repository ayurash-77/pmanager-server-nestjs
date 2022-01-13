import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { JobModel } from '@app/jobs/models/job.model';

export class CreateJobDto extends JobModel {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  name: string;

  @IsOptional()
  @IsString({ message: `поле 'details' должно быть строкой` })
  details?: string;
}
