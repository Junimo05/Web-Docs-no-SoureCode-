import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //get request
    const request = context.switchToHttp().getRequest();
    //get token from request
    const token = this.extractTokenFromHeader(request);

    //check token if it not exist
    if (!token) {
      throw new UnauthorizedException();
    }

    //if token exist
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        // secret: this.config.get('JWT_SECRET'),
        secret: this.config.get<string>('key.jwtKey'),
      });
      console.log('auth.guard: payload = ', payload);

      // We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
