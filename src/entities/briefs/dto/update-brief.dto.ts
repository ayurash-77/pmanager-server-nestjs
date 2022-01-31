import { PartialType } from '@nestjs/swagger';
import { CreateBriefDto } from './create-brief.dto';

export class UpdateBriefDto extends PartialType(CreateBriefDto) {}
