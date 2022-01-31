import { Module } from '@nestjs/common';
import { BriefCategoriesService } from './brief-categories.service';
import { BriefCategoriesController } from './brief-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BriefCategory } from '@app/entities/brief-categories/brief-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BriefCategory])],
  controllers: [BriefCategoriesController],
  providers: [BriefCategoriesService],
})
export class BriefCategoriesModule {}
