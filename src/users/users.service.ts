import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { hash, compare } from 'bcrypt';
import { IsTakenField } from '@app/utils/isTakenField';
import { path as appPath } from 'app-root-path';
import { MoveFileDto } from '@app/files/dto/move-file.dto';
import { FilesService } from '@app/files/files.service';
import * as fse from 'fs-extra';
import { RemoveUserResponseInterface } from '@app/users/types/removeUserResponse.interface';

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
        roles: user.roles,
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
    return { user, message: `Пользователь '${user.username}' удален.` };
  }
  // Авторизация
  async login(userLoginDto: LoginUserDto): Promise<User> {
    const user = await this.repo.findOne({
      where: [{ email: userLoginDto.username }, { username: userLoginDto.username }],
      select: ['id', 'email', 'password', 'isAdmin', 'username', 'name', 'surname', 'phone', 'image'],
    });
    if (!user) {
      throw new UnprocessableEntityException(`Пользователь '${userLoginDto.username}' не найден`);
    }
    const isPasswordCorrect = await compare(userLoginDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new UnprocessableEntityException('Password incorrect');
    }
    delete user.password;
    return user;
  }

  // Хеширование
  async hashPassword(password) {
    return await hash(password, 5);
  }

  // Регистрация нового пользователя
  async create(createUserDto: CreateUserDto): Promise<User> {
    await IsTakenField(this.repo, 'username', createUserDto, User.name);
    await IsTakenField(this.repo, 'email', createUserDto, User.name);
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = await this.hashPassword(createUserDto.password);
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
    const user = await this.repo.findOne(id, { relations: ['roles'] });
    if (!user) throw new HttpException(`Пользователь с ID=${id} не найден`, HttpStatus.NOT_FOUND);
    return user;
  }

  // Изменить пользователя по ID
  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);

    await IsTakenField(this.repo, 'username', updateUserDto, User.name, id);
    await IsTakenField(this.repo, 'email', updateUserDto, User.name, id);

    Object.assign(user, updateUserDto);
    user.image = await this.addUserImage(user.username, updateUserDto.image);
    if (user.password) user.password = await hash(updateUserDto.password, 5);
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
