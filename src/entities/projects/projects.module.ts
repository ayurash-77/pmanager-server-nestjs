import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@app/entities/projects/project.entity';
import { FilesModule } from '@app/files/files.module';
import { Status } from '@app/entities/statuses/status.entity';
import { StatusesService } from '@app/entities/statuses/statuses.service';
import { BrandsService } from '@app/entities/brands/brands.service';
import { Brand } from '@app/entities/brands/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Status, Brand]), FilesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, StatusesService, BrandsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
