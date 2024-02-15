import { User } from "src/users/entities/user.entity";

export class AuthUserDto {
    readonly user: User;
    readonly accessToken: string;
    readonly refreshToken: string;
}
