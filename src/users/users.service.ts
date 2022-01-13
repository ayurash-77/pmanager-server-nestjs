import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const findByUsername = await this.repo.findOne({ username: createUserDto.username });
    const findByEmail = await this.repo.findOne({ email: createUserDto.email });
    if (findByUsername) {
      throw new UnprocessableEntityException(`Пользователь '${createUserDto.username}' уже существует`);
    }
    if (findByEmail) {
      throw new UnprocessableEntityException(`Пользователь с email '${createUserDto.email}' уже существует`);
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
    if (!user) {
      throw new NotFoundException(`Пользователь с ID=${id} не найден`);
    }
    return user;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException(`Пользователь с ID=${id} не найден`);
    }
    Object.assign(user, updateUserDto);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException(`Пользователь с ID=${id} не найден`);
    }
    return this.repo.remove(user);
  }
}
