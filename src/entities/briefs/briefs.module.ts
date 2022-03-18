import { Module } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { BriefsController } from './briefs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brief } from '@app/entities/briefs/brief.entity';
import { ProjectsModule } from '@app/entities/projects/projects.module';
import { FilesService } from '@app/files/files.service';
import { Project } from '@app/entities/projects/project.entity';
import { BriefsCategory } from '@app/entities/briefsCategories/briefsCategory.entity';
import { BriefsCategoriesModule } from '@app/entities/briefsCategories/briefsCategories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brief, Project, BriefsCategory]),
    ProjectsModule,
    BriefsCategoriesModule,
  ],
  controllers: [BriefsController],
  providers: [BriefsService, FilesService],
})
export class BriefsModule {}
