import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@app/projects/project.entity';
import { FilesModule } from '@app/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), FilesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
