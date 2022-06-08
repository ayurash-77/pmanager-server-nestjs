import { Module } from '@nestjs/common';
import { ReelsTypesService } from './reelsTypes.service';
import { ReelsTypesController } from './reelsTypes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { Status } from '@app/entities/statuses/status.entity';
import { StatusesService } from '@app/entities/statuses/statuses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReelsType, Status])],
  controllers: [ReelsTypesController],
  providers: [ReelsTypesService, StatusesService],
  exports: [ReelsTypesService],
})
export class ReelsTypesModule {}
