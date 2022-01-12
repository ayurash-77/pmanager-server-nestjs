import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);

    try {
      const decode = verify(token, process.env.JWT_SECRET);
    } catch (err) {
      req.user = null;
      next();
    }

    next();
  }
}
