import { Module } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { BriefsController } from './briefs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brief } from '@app/entities/briefs/brief.entity';
import { ProjectsModule } from '@app/entities/projects/projects.module';
import { FilesService } from '@app/files/files.service';
import { Project } from '@app/entities/projects/project.entity';
import { BriefCategory } from '@app/entities/brief-categories/brief-category.entity';
import { BriefCategoriesModule } from '@app/entities/brief-categories/brief-categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Brief, Project, BriefCategory]), ProjectsModule, BriefCategoriesModule],
  controllers: [BriefsController],
  providers: [BriefsService, FilesService],
})
export class BriefsModule {}
