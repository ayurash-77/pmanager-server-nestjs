import { User } from '@app/users/entities/user.entity';

export interface RemoveUserResponseInterface {
  user: User;
  message: string;
}
