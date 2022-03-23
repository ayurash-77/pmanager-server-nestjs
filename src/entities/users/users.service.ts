import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { compare, hash } from 'bcrypt';
import { IsTakenField } from '@app/utils/isTakenField';
import { path as appPath } from 'app-root-path';
import { MoveFileDto } from '@app/files/dto/move-file.dto';
import { FilesService } from '@app/files/files.service';
import * as fse from 'fs-extra';
import { RemoveUserResponseInterface } from '@app/entities/users/types/removeUserResponse.interface';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>, private filesService: FilesService) {}

  // Jwt Generation
  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      ...user,
      token: this.generateJwt(user),
    };
  }

  buildRemoveUserResponse(user: User): RemoveUserResponseInterface {
    return { user, message: `User '${user.username}' deleted.` };
  }
  // Авторизация
  async login(userLoginDto: LoginUserDto): Promise<User> {
    const user = await this.repo.findOne({
      where: [{ email: userLoginDto.username }, { username: userLoginDto.username }],
      select: ['id', 'email', 'password', 'isAdmin', 'username', 'name', 'surname', 'phone', 'image'],
    });
    // const passwordCorrect = await compare(userLoginDto.password, user.password);
    if (user && (await compare(userLoginDto.password, user.password))) {
      delete user.password;
      return user;
    }
    throw new UnprocessableEntityException('Username or password incorrect');
  }

  // Хеширование
  async hashPassword(password) {
    return await hash(password, 5);
  }

  // Регистрация нового пользователя
  async create(dto: CreateUserDto): Promise<User> {
    await IsTakenField(this.repo, 'username', dto.username, User.name);
    await IsTakenField(this.repo, 'email', dto.email, User.name);
    const user = new User();
    Object.assign(user, dto);
    user.password = await this.hashPassword(dto.password);
    if (user.image) {
      user.image = await this.addUserImage(user.username, user.image);
    }
    return await this.repo.save(user);
  }

  // Добавить (из UPLOAD) изображение пользователя если существует
  async addUserImage(username, image): Promise<string | null> {
    if (image) {
      const srcPath = image;
      const newImage = `${process.env.STATIC_DIR}/users/${username}/userImage.jpg`;
      const dstPath = `${appPath}/${newImage}`;
      const moveFileDto: MoveFileDto = { srcPath, dstPath };

      const srcPathExists = await fse.pathExists(srcPath);
      if (srcPathExists) {
        const move = await this.filesService.moveFile(moveFileDto);
        if (move) return newImage;
      }
      return null;
    }
  }

  // Получить всех пользователей
  getAll(): Promise<User[]> {
    return this.repo.find();
  }

  // Получить пользователя по ID
  async getById(id: number): Promise<User | null> {
    const user = await this.repo.findOne(id);
    if (!user) throw new HttpException(`User with ID=${id} not found`, HttpStatus.NOT_FOUND);
    return user;
  }

  // Изменить пользователя по ID
  async updateById(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);

    await IsTakenField(this.repo, 'username', dto.username, User.name, id);
    await IsTakenField(this.repo, 'email', dto.email, User.name, id);

    const oldImage = user.image;

    Object.assign(user, dto);
    const newImage = await this.addUserImage(user.username, dto.image);

    user.image = newImage ? newImage : oldImage;

    if (user.password) user.password = await hash(dto.password, 5);
    return this.repo.save(user);
  }

  // Удалить пользователя по ID
  async remove(id: number): Promise<User> {
    const user = await this.getById(id);
    const userPath = `${process.env.STATIC_DIR}/users/${user.username}`;
    await this.filesService.remove(userPath);
    return this.repo.remove(user);
  }
}
