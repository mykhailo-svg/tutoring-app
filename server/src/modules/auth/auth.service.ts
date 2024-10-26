import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async checkIfUserExists(dto: CreateUserDto) {
    const existingUser = await this.userService.findExistingUser({
      email: dto.email,
    });

    if (existingUser) {
      throw new ConflictException('User already exists!');
    }

    const createdUser = await this.userService.createUser(dto);

    return createdUser;
  }

  async login({ email, password }: LoginDto) {
    const passwordOrEmailIsIncorrectMessage = 'Password or email is incorrect!';

    const user = await this.userService.findExistingUser({ email });

    if (!user) {
      throw new UnauthorizedException(passwordOrEmailIsIncorrectMessage);
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(passwordOrEmailIsIncorrectMessage);
    }

    return { user };
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeRefreshToken(refreshToken);
  }
}
