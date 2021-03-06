import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequestInterface>();
    if (request.user) return true;
    throw new UnauthorizedException('Необходимо авторизоваться');
  }
}
