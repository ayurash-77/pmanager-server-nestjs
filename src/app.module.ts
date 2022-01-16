import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
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

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    RolesModule,
    JobsModule,
    TagsModule,
    BrandsModule,
    AgenciesModule,
  ],
  controllers: [AppController],
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
