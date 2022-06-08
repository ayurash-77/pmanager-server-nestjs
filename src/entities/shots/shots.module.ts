import { Module } from '@nestjs/common';
import { ShotsService } from './shots.service';
import { ShotsController } from './shots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shot } from '@app/entities/shots/shot.entity';
import { ProjectsModule } from '@app/entities/projects/projects.module';
import { ReelsModule } from '@app/entities/reels/reels.module';
import { Reel } from '@app/entities/reels/reel.entity';
import { StatusesService } from '@app/entities/statuses/statuses.service';
import { Status } from '@app/entities/statuses/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shot, Reel, Status]), ProjectsModule, ReelsModule],
  controllers: [ShotsController],
  providers: [ShotsService, StatusesService],
  exports: [ShotsService],
})
export class ShotsModule {}
