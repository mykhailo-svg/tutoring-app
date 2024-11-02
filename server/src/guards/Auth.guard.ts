import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { getConfig } from '@src/config/config';
import { AuthProtectedRequest, AuthUser } from '@src/globalTypes';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthProtectedRequest>();
    const config = getConfig();

    let user: AuthUser | null = null;

    const bearerHeader = request.headers['authorization'];

    if (bearerHeader) {
      const accessToken = bearerHeader.split(' ')[1];

      if (accessToken) {
        try {
          user = jwt.verify(accessToken, config.jwt.secretKey, {
            algorithms: ['HS256'],
          }) as AuthUser;
        } catch (error) {}
      }
    }

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { id, email } = user;

    request.user = { id, email };

    return true;
  }
}
