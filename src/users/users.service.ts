import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
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
    const user = await this.repo.findOne(
      { email: userLoginDto.email },
      {
        select: ['id', 'email', 'password', 'username', 'name', 'surname', 'phone', 'image'],
      },
    );
    if (!user) {
      throw new UnprocessableEntityException(`Пользователь с email '${userLoginDto.email}' не найден`);
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
    await this.isTaken('username', createUserDto.username);
    await this.isTaken('email', createUserDto.email);
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

  async isTaken(key: string, value: string): Promise<boolean> {
    if (await this.repo.findOne({ [key]: value })) {
      throw new HttpException(
        `Пользователь с ${key} '${value}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return false;
  }

  // Изменить пользователя по ID
  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);

    await this.isTaken('username', updateUserDto.username);
    await this.isTaken('email', updateUserDto.email);
    Object.assign(user, updateUserDto);
    if (user.password) user.password = await hash(updateUserDto.password, 5);
    return this.repo.save(user);
  }

  // Удалить пользователя по ID
  async remove(id: number): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) throw new NotFoundException(`Пользователь с ID=${id} не найден`);
    return this.repo.remove(user);
  }
}
