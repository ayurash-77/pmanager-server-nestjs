import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@app/entities/projects/project.entity';
import { FilesModule } from '@app/files/files.module';
import { Status } from '@app/entities/statuses/status.entity';
import { StatusesService } from '@app/entities/statuses/statuses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Status]), FilesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, StatusesService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
