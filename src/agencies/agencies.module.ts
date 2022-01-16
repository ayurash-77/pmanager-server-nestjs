import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from '@app/agencies/entities/agency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agency])],
  controllers: [AgenciesController],
  providers: [AgenciesService],
  exports: [AgenciesService],
})
export class AgenciesModule {}
