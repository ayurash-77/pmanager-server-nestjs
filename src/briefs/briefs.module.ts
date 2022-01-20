import { Module } from '@nestjs/common';
import { BriefsService } from './briefs.service';
import { BriefsController } from './briefs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brief } from '@app/briefs/entities/brief.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brief])],
  controllers: [BriefsController],
  providers: [BriefsService],
})
export class BriefsModule {}
