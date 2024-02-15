import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource
    ) { }

    async signUp(signupUserDto: SignupUserDto): Promise<AuthUserDto> {
        const usersRepository: Repository<User> = this.dataSource.getRepository(User);

        if (await usersRepository.findOne({ where: { email: signupUserDto.email } })) throw new ConflictException();

        const user: User = usersRepository.create({
            ...signupUserDto,
            password: await hash(signupUserDto.password, await genSalt())
        });

        return await this.generateAuthUserDto(await usersRepository.save(user));
    }

    async logIn(loginUserDto: LoginUserDto): Promise<AuthUserDto> {
        const usersRepository: Repository<User> = this.dataSource.getRepository(User);

        const user: User | null = await usersRepository.findOne({
            select: { id: true, email: true, username: true, password: true },
            where: { username: loginUserDto.username }
        });

        if (!user) throw new NotFoundException();
        if (!await compare(loginUserDto.password, user.password)) throw new UnauthorizedException();

        return await this.generateAuthUserDto(user);
    }

    async refresh(refreshToken: string): Promise<AuthUserDto> {
        try {
            const usersRepository: Repository<User> = this.dataSource.getRepository(User);

            const payload = await this.jwtService.verifyAsync(
                refreshToken,
                { secret: this.configService.get<string>('JWT_SECRET') }
            );

            const user: User | null = await usersRepository.findOne({
                where: { id: payload.sub }
            });

            if (!user) throw new NotFoundException();

            return await this.generateAuthUserDto(user);
        } catch {
            throw new UnauthorizedException();
        }
    }

    private async generateAuthUserDto(user: User): Promise<AuthUserDto> {
        return {
            user: user,
            accessToken: await this.jwtService.signAsync(
                { sub: user.id },
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: '60m'
                }
            ),
            refreshToken: await this.jwtService.signAsync(
                { sub: user.id },
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: '24h'
                }
            )
        };
    }
}
