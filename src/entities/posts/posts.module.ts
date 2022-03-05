import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@app/entities/posts/post.entity';
import { Project } from '@app/entities/projects/project.entity';
import { ProjectsModule } from '@app/entities/projects/projects.module';
import { Tag } from '@app/entities/tags/tag.entity';
import { TagsService } from '@app/entities/tags/tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Project, Tag]), ProjectsModule],
  controllers: [PostsController],
  providers: [PostsService, TagsService],
})
export class PostsModule {}
