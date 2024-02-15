import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() signupUserDto: SignupUserDto): Promise<AuthUserDto> {
        return await this.authService.signUp(signupUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async logIn(@Body() loginUserDto: LoginUserDto): Promise<AuthUserDto> {
        return await this.authService.logIn(loginUserDto);
    }
}
