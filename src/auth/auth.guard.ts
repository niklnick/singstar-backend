import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const [type, accessToken] = request.headers['authorization']?.split(' ') ?? [];

    if (type !== 'Bearer' || !accessToken) throw new UnauthorizedException();

    try {
      await this.jwtService.verifyAsync(accessToken);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
