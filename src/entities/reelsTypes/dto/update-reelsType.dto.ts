import { PartialType } from '@nestjs/swagger';
import { CreateReelsTypeDto } from './create-reelsType.dto';

export class UpdateReelsTypeDto extends PartialType(CreateReelsTypeDto) {}
