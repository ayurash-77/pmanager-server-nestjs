import { Module } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { BriefsController } from './briefs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brief } from '@app/briefs/brief.entity';
import { ProjectsModule } from '@app/projects/projects.module';
import { FilesService } from '@app/files/files.service';
import { Project } from '@app/projects/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brief, Project]), ProjectsModule],
  controllers: [BriefsController],
  providers: [BriefsService, FilesService],
})
export class BriefsModule {}
