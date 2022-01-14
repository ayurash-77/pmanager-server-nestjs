import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@app/roles/entities/role.entity';
import { CreateRoleDto } from '@app/roles/dto/create-role.dto';
import { UpdateRoleDto } from '@app/roles/dto/update-role.dto';
import { IsTakenField } from '@app/utils/isTakenField';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) public repo: Repository<Role>) {}

  // Создать новую роль
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    await IsTakenField(this.repo, 'name', createRoleDto, Role.name);
    const role = this.repo.create(createRoleDto);
    return await this.repo.save(role);
  }

  // Получить все роли
  async getAll(): Promise<Role[]> {
    return await this.repo.find();
  }

  // Получить роль по ID
  async getById(id: number): Promise<Role | null> {
    const role = await this.repo.findOne(id);
    if (!role) throw new HttpException(`Роль с id=${id} не найдена`, HttpStatus.NOT_FOUND);
    return role;
  }

  // Изменить роль по ID
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.getById(id);
    await IsTakenField(this.repo, 'name', updateRoleDto, Role.name, id);
    Object.assign(role, updateRoleDto);
    return this.repo.save(role);
  }

  // Удалить роль по ID
  async remove(id: number): Promise<Role> {
    const role = await this.getById(id);
    return this.repo.remove(role);
  }
}
