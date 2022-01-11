import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    if (await this.repo.findOne({ email })) {
      throw new BadRequestException(`Пользователь с email ${createUserDto.email} уже существует`);
    }
    const user = this.repo.create(createUserDto);
    return await this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException(`Пользователь с ID=${id} не найден`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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
