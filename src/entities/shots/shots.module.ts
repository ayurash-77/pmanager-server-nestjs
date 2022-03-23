import { Module } from '@nestjs/common';
import { ShotsService } from './shots.service';
import { ShotsController } from './shots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shot } from '@app/entities/shots/shot.entity';
import { ProjectsModule } from '@app/entities/projects/projects.module';
import { ReelsModule } from '@app/entities/reels/reels.module';
import { Reel } from '@app/entities/reels/reel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shot, Reel]), ProjectsModule, ReelsModule],
  controllers: [ShotsController],
  providers: [ShotsService],
  exports: [ShotsService],
})
export class ShotsModule {}
