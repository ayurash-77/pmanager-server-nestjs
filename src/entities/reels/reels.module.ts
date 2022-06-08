import { Module } from '@nestjs/common';
import { ReelsService } from './reels.service';
import { ReelsController } from './reels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reel } from '@app/entities/reels/reel.entity';
import { ReelsTypesService } from '@app/entities/reelsTypes/reelsTypes.service';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';
import { ProjectsModule } from '@app/entities/projects/projects.module';
import { Status } from '@app/entities/statuses/status.entity';
import { StatusesService } from '@app/entities/statuses/statuses.service';
import { Shot } from '@app/entities/shots/shot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reel, ReelsType, Status, Shot]), ProjectsModule],
  controllers: [ReelsController],
  providers: [ReelsService, ReelsTypesService, StatusesService],
  exports: [ReelsService],
})
export class ReelsModule {}
