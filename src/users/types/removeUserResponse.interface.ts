import { User } from '@app/users/user.entity';

export interface RemoveUserResponseInterface {
  user: User;
  message: string;
}
