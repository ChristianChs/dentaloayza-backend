import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles =
      this.reflector.get<string[]>('roles', context.getHandler()) ||
      this.reflector.get<string[]>('roles', context.getClass());

    if (!roles || roles.length === 0) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.roles)
      throw new ForbiddenException('Acceso denegado: usuario no tiene roles');

    const hasRole = user.roles.some((role: string) => roles.includes(role));

    if (!hasRole)
      throw new ForbiddenException(
        'Acceso denegado: usuario no tiene los roles necesarios',
      );
    return hasRole;
  }
}
