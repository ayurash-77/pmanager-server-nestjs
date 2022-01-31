import { Request } from 'express';
import { User } from '@app/entities/users/user.entity';

export interface ExpressRequestInterface extends Request {
  user?: User;
}
