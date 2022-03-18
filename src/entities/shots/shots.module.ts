import { Module } from '@nestjs/common';
import { ShotsService } from './shots.service';
import { ShotsController } from './shots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shot } from '@app/entities/shots/shot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shot])],
  controllers: [ShotsController],
  providers: [ShotsService],
  exports: [ShotsService],
})
export class ShotsModule {}
