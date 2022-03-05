import { Module } from '@nestjs/common';
import { SequencesService } from './sequences.service';
import { SequencesController } from './sequences.controller';

@Module({
  controllers: [SequencesController],
  providers: [SequencesService],
})
export class SequencesModule {}
