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
import { compare } from 'bcrypt';

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

  // Регистрация нового пользователя
  async create(createUserDto: CreateUserDto): Promise<User> {
    const findByUsername = await this.repo.findOne({ username: createUserDto.username });
    const findByEmail = await this.repo.findOne({ email: createUserDto.email });
    if (findByUsername) {
      throw new HttpException(
        `Пользователь '${createUserDto.username}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (findByEmail) {
      throw new HttpException(
        `Пользователь с email '${createUserDto.email}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = new User();
    Object.assign(user, createUserDto);
    return await this.repo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.repo.findOne(id);
    if (!user) throw new HttpException(`Пользователь с ID=${id} не найден`, HttpStatus.NOT_FOUND);
    return user;
  }

  async isTaken(key: string, value: string): Promise<boolean> {
    return !!(await this.repo.findOne({ [key]: value }));
  }

  // Изменить пользователя по ID
  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    const isUsernameTaken = await this.isTaken('username', updateUserDto.username);
    if (isUsernameTaken) {
      throw new HttpException(
        `Пользователь с username '${updateUserDto.username}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isEmailTaken = await this.isTaken('email', updateUserDto.email);
    if (isEmailTaken) {
      throw new HttpException(
        `Пользователь с email '${updateUserDto.email}' уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    Object.assign(user, updateUserDto);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) throw new NotFoundException(`Пользователь с ID=${id} не найден`);
    return this.repo.remove(user);
  }
}
