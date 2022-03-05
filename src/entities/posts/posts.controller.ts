import {
  Controller,
  Get,
  Post as PostDecorator,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { UserDecorator } from '@app/entities/users/decorators/user.decorator';
import { User } from '@app/entities/users/user.entity';
import { Post } from '@app/entities/posts/post.entity';

@ApiTags('Посты')
@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Создать новый пост
  @PostDecorator()
  @ApiOperation({ summary: 'Создать новый пост' })
  @ApiResponse({ status: 200, type: Post })
  create(@UserDecorator() currentUser: User, @Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postsService.create(currentUser, createPostDto);
  }

  // Получить все посты
  @Get()
  @ApiOperation({ summary: 'Получить все посты' })
  @ApiResponse({ status: 200, type: [Post] })
  getAll(): Promise<Post[]> {
    return this.postsService.getAll();
  }

  // Получить все посты по ID проекта
  @Get('project/:id')
  @ApiOperation({ summary: 'Получить все посты по ID проекта' })
  @ApiResponse({ status: 200, type: [Post] })
  getByProjectId(@Param('id') id: string): Promise<Post[]> {
    return this.postsService.getByProjectId(+id);
  }

  // Получить пост по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить пост по ID' })
  @ApiResponse({ status: 200, type: Post })
  getById(@Param('id') id: string): Promise<Post> {
    return this.postsService.getById(+id);
  }

  // Изменить пост по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить пост по ID' })
  @ApiResponse({ status: 200, type: Post })
  update(@UserDecorator() currentUser: User, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(currentUser, +id, updatePostDto);
  }

  // Удалить пост по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пост по ID' })
  @ApiResponse({ status: 200, type: Post })
  remove(@UserDecorator() currentUser: User, @Param('id') id: string): Promise<Post> {
    return this.postsService.remove(currentUser, +id);
  }
}
