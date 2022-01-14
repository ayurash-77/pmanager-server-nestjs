import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@app/roles/entities/role.entity';
import { JobsService } from '@app/jobs/jobs.service';
import { Job } from '@app/jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Job])],
  controllers: [RolesController],
  providers: [RolesService, JobsService],
})
export class RolesModule {}
