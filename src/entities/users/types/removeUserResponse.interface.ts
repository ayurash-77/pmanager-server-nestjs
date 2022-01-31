import { User } from '@app/entities/users/user.entity';

export interface RemoveUserResponseInterface {
  user: User;
  message: string;
}
