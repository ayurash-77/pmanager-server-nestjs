import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from '@app/entities/tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@app/entities/users/users.module';
import config from '@app/ormconfig';
import { AuthMiddleware } from '@app/entities/users/middlewares/auth.middleware';
import { JobsModule } from './entities/jobs/jobs.module';
import { RolesModule } from './entities/roles/roles.module';
import { BrandsModule } from './entities/brands/brands.module';
import { AgenciesModule } from './entities/agencies/agencies.module';
import { ProjectsModule } from './entities/projects/projects.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path as appPath } from 'app-root-path';
import { BriefsModule } from './entities/briefs/briefs.module';
import { StatusesModule } from './entities/statuses/statuses.module';
import { ClientsModule } from './entities/clients/clients.module';
import { ShotsModule } from './entities/shots/shots.module';
import { ReelsModule } from './entities/reels/reels.module';
import { ReelsTypesModule } from './entities/reelsTypes/reelsTypes.module';
import { PostsModule } from './entities/posts/posts.module';
import { TasksModule } from './entities/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(config),

    ServeStaticModule.forRoot({
      rootPath: `${appPath}/${process.env.UPLOAD_DIR}`,
      serveRoot: `/api/${process.env.UPLOAD_DIR}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${appPath}/${process.env.STATIC_DIR}`,
      serveRoot: `/api/${process.env.STATIC_DIR}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.env.WORK_ROOT}`,
      serveRoot: '/api/root',
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
    StatusesModule,
    ClientsModule,
    ShotsModule,
    ReelsModule,
    ReelsTypesModule,
    PostsModule,
    TasksModule,
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
