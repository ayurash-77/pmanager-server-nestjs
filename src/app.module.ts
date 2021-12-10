import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ConfigModule.forRoot(), TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
