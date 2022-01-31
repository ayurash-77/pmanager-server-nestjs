import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequestInterface>();

    if (!request.user) throw new UnauthorizedException('Необходимо авторизоваться');
    if (request.user.isAdmin) return true;
    throw new ForbiddenException('Нет доступа');
  }
}
