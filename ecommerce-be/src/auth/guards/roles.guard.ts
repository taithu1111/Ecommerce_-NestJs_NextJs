import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!requiredRoles) return true; // không có metadata -> không cần role

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.roles) return false;
    // nếu user.roles chứa ít nhất 1 role trong requiredRoles => cho phép
    return requiredRoles.some(role => user.roles.includes(role));
  }
}
