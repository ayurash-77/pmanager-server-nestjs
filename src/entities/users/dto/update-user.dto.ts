import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@app/entities/users/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
