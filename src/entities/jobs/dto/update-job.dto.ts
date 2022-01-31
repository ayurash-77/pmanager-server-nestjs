import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from '@app/entities/jobs/dto/create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {}
