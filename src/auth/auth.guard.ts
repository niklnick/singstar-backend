import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configServicce: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const [type, accessToken] = request.headers['authorization']?.split(' ') ?? [];

    if (type !== 'Bearer' || !accessToken) throw new UnauthorizedException();

    try {
      await this.jwtService.verifyAsync(
        accessToken,
        { secret: this.configServicce.get<string>('JWT_SECRET') }
      );
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
