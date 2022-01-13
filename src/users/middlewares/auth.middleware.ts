import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = verify(token, process.env.JWT_SECRET) as JwtPayload;
      req.user = await this.usersService.getById(decoded.id);
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
