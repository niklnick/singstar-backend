import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt-config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfigService
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
