import { Module } from '@nestjs/common';
import { SequencesService } from './sequences.service';
import { SequencesController } from './sequences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sequence } from '@app/entities/sequences/sequence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sequence])],
  controllers: [SequencesController],
  providers: [SequencesService],
  exports: [SequencesService],
})
export class SequencesModule {}
