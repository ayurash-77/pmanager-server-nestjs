import { RoleModel } from '@app/roles/models/role.model';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto extends RoleModel {
  @IsNotEmpty({ message: `поле 'name' не может быть пустым` })
  @IsString({ message: `поле 'name' должно быть строкой` })
  name: string;

  @IsOptional()
  @IsString({ message: `поле 'details' должно быть строкой` })
  details?: string;
}
