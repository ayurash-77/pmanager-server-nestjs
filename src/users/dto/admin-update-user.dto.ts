import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@app/users/dto/create-user.dto';

export class AdminUpdateUserDto extends PartialType(CreateUserDto) {
  isAdmin: boolean;
}
