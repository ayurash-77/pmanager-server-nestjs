import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@app/entities/posts/post.entity';
import { Project } from '@app/entities/projects/project.entity';
import { ProjectsModule } from '@app/entities/projects/projects.module';
import { Tag } from '@app/entities/tags/tag.entity';
import { TagsService } from '@app/entities/tags/tags.service';
import { Reel } from '@app/entities/reels/reel.entity';
import { ReelsModule } from '@app/entities/reels/reels.module';
import { Shot } from '@app/entities/shots/shot.entity';
import { ShotsModule } from '@app/entities/shots/shots.module';
import { ShotsService } from '@app/entities/shots/shots.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Project, Tag, Reel, Shot]),
    ProjectsModule,
    ReelsModule,
    ShotsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, TagsService],
})
export class PostsModule {}
