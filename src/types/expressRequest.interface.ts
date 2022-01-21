import { Request } from 'express';
import { User } from '@app/users/user.entity';

export interface ExpressRequestInterface extends Request {
  user?: User;
}
