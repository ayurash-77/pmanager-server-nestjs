import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from '@app/tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@app/users/users.module';
import config from '@app/ormconfig';
import { AuthMiddleware } from '@app/users/middlewares/auth.middleware';
import { JobsModule } from './jobs/jobs.module';
import { RolesModule } from './roles/roles.module';
import { BrandsModule } from './brands/brands.module';
import { AgenciesModule } from './agencies/agencies.module';
import { ProjectsModule } from './projects/projects.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path as appPath } from 'app-root-path';
import { BriefsModule } from './briefs/briefs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(config),

    ServeStaticModule.forRoot({
      rootPath: `${appPath}/${process.env.UPLOAD_DIR}`,
      serveRoot: `/${process.env.UPLOAD_DIR}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${appPath}/${process.env.STATIC_DIR}`,
      serveRoot: `/${process.env.STATIC_DIR}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.env.WORK_ROOT}`,
      serveRoot: '/root',
    }),
    UsersModule,
    RolesModule,
    JobsModule,
    TagsModule,
    BrandsModule,
    AgenciesModule,
    ProjectsModule,
    FilesModule,
    BriefsModule,
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
