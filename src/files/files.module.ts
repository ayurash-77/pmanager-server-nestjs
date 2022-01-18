import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path as appPath } from 'app-root-path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${appPath}/upload`,
      serveRoot: '/upload',
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.env.WORK_ROOT}`,
      serveRoot: '/root',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
