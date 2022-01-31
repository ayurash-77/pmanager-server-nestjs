import { User } from '@app/entities/users/user.entity';

export interface UserResponseInterface extends User {
  token: string;
}
