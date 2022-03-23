import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '@app/entities/clients/client.entity';
import { Repository } from 'typeorm';
import { IsTakenField } from '@app/utils/isTakenField';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) public repo: Repository<Client>) {}

  // Создать нового клиента
  async create(dto: CreateClientDto): Promise<Client> {
    await IsTakenField(this.repo, 'name', dto.name, Client.name);
    const client = this.repo.create(dto);
    return await this.repo.save(client);
  }

  // Получить всех клиентов
  async getAll(): Promise<Client[]> {
    return await this.repo.find();
  }

  // Получить клиента по ID
  async getById(id: number): Promise<Client | null> {
    const client = await this.repo.findOne(id);
    if (!client) throw new HttpException(`Клиент с id=${id} не найден`, HttpStatus.NOT_FOUND);
    return client;
  }

  // Изменить клиента по ID
  async update(id: number, dto: UpdateClientDto): Promise<Client> {
    const client = await this.getById(id);
    await IsTakenField(this.repo, 'name', dto.name, Client.name, id);
    Object.assign(client, dto);
    return this.repo.save(client);
  }

  // Удалить клиента по ID
  async remove(id: number): Promise<Client> {
    const client = await this.getById(id);
    return this.repo.remove(client);
  }
}
