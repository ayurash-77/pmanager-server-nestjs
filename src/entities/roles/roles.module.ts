import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@app/entities/roles/role.entity';
import { JobsService } from '@app/entities/jobs/jobs.service';
import { Job } from '@app/entities/jobs/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Job])],
  controllers: [RolesController],
  providers: [RolesService, JobsService],
})
export class RolesModule {}
