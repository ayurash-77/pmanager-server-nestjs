import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@app/entities/roles/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<ExpressRequestInterface>();
    if (!request.user) throw new HttpException('Необходимо авторизоваться', HttpStatus.UNAUTHORIZED);

    if (request.user.isAdmin) return true;

    const res = requiredRoles.includes(request.user.role.name);
    if (!res) throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);

    return true;
  }
}
