import { PartialType } from '@nestjs/mapped-types';
import { SignupUserDto } from 'src/auth/dto/signup-user.dto';

export class UpdateUserDto extends PartialType(SignupUserDto) { }
