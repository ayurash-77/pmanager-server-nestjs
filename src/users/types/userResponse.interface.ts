import { User } from '@app/users/entities/user.entity';

export interface UserResponseInterface extends User {
  token: string;
}
