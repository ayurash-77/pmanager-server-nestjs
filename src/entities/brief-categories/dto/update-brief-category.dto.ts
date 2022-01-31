import { PartialType } from '@nestjs/swagger';
import { CreateBriefCategoryDto } from '@app/entities/brief-categories/dto/create-brief-category.dto';

export class UpdateBriefCategoryDto extends PartialType(CreateBriefCategoryDto) {}
