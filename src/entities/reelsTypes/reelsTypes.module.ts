import { Module } from '@nestjs/common';
import { ReelsTypesService } from './reelsTypes.service';
import { ReelsTypesController } from './reelsTypes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReelsType } from '@app/entities/reelsTypes/reelsType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReelsType])],
  controllers: [ReelsTypesController],
  providers: [ReelsTypesService],
  exports: [ReelsTypesService],
})
export class ReelsTypesModule {}
