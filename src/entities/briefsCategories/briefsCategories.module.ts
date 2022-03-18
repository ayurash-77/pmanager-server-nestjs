import { Module } from '@nestjs/common';
import { BriefsCategoriesService } from './briefsCategories.service';
import { BriefsCategoriesController } from './briefsCategories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BriefsCategory } from '@app/entities/briefsCategories/briefsCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BriefsCategory])],
  controllers: [BriefsCategoriesController],
  providers: [BriefsCategoriesService],
})
export class BriefsCategoriesModule {}
