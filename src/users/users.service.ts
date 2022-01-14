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

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  async login(userLoginDto: LoginUserDto): Promise<User> {
    const user = await this.repo.findOne({
      where: [{ email: userLoginDto.username }, { username: userLoginDto.username }],
      select: ['id', 'email', 'password', 'username', 'name', 'surname', 'phone', 'image'],
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
    return await this.repo.save(user);
  }

  // Получить всех пользователей
  getAll(): Promise<User[]> {
    return this.repo.find();
  }

  async getById(id: number): Promise<User | null> {
    const user = await this.repo.findOne(id);
    if (!user) throw new HttpException(`Пользователь с ID=${id} не найден`, HttpStatus.NOT_FOUND);
    return user;
  }

  // Изменить пользователя по ID
  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);

    await IsTakenField(this.repo, 'username', updateUserDto, User.name, id);
    await IsTakenField(this.repo, 'email', updateUserDto, User.name, id);

    Object.assign(user, updateUserDto);
    if (user.password) user.password = await hash(updateUserDto.password, 5);
    return this.repo.save(user);
  }

  // Удалить пользователя по ID
  async remove(id: number): Promise<User> {
    const user = await this.getById(id);
    return this.repo.remove(user);
  }
}
