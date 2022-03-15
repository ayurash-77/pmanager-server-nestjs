import { Module } from '@nestjs/common';
import { ReelsService } from './reels.service';
import { ReelsController } from './reels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reel } from '@app/entities/reels/reel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reel])],
  controllers: [ReelsController],
  providers: [ReelsService],
  exports: [ReelsService],
})
export class ReelsModule {}
