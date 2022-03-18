import { PartialType } from '@nestjs/swagger';
import { CreateBriefsCategoryDto } from '@app/entities/briefsCategories/dto/create-briefsCategory.dto';

export class UpdateBriefsCategoryDto extends PartialType(CreateBriefsCategoryDto) {}
