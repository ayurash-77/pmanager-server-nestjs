import { User } from '@app/users/user.entity';

export interface UserResponseInterface extends User {
  token: string;
}
