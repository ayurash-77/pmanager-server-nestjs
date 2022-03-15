import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/entities/posts/post.entity';
import { Repository } from 'typeorm';
import { User } from '@app/entities/users/user.entity';
import { ProjectsService } from '@app/entities/projects/projects.service';
import { TagsService } from '@app/entities/tags/tags.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) public postRepo: Repository<Post>,
    private projectsService: ProjectsService,
    private tagsService: TagsService,
  ) {}

  // Создать новый пост
  async create(user: User, dto: CreatePostDto): Promise<Post> {
    const post = await this.postRepo.create(dto);
    const project = await this.projectsService.getById(dto.projectId);
    const tags = await this.tagsService.getByIds(dto.tagsIds);

    if (tags) post.tags = tags;
    post.createdBy = user;
    post.project = project;
    return await this.postRepo.save(post);
  }

  // Получить все посты
  async getAll(): Promise<Post[]> {
    return await this.postRepo.find();
  }

  // Получить все посты по ID проекта
  async getByProjectId(id: number): Promise<Post[]> {
    return await this.postRepo.find({ where: { projectId: id } });
  }

  // Получить пост по ID
  async getById(id: number): Promise<Post | null> {
    const post = await this.postRepo.findOne(id);
    if (!post) throw new HttpException(`Пост с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return post;
  }

  // Изменить пост по ID
  async update(user: User, id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.getById(id);
    if (user.id !== post.createdBy.id && !user.isAdmin)
      throw new HttpException(`Недостаточно прав`, HttpStatus.FORBIDDEN);
    Object.assign(post, updatePostDto);
    return this.postRepo.save(post);
  }

  // Удалить пост по ID
  async remove(user: User, id: number): Promise<Post> {
    const post = await this.getById(id);
    if (user.id !== post.createdBy.id && !user.isAdmin)
      throw new HttpException(`Недостаточно прав`, HttpStatus.FORBIDDEN);
    return this.postRepo.remove(post);
  }
}
