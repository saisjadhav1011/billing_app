import { UserRole } from '@app/database/types';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('AdminGuard - User from request:', user);

    if (!user || user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin access only');
    }

    return true;
  }
}