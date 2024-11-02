import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { TokenService } from '../token/token.service';
import { User } from '@src/entities';
import { getConfig } from '@src/config';
import { Response } from 'express';
import { UserAuthTokenCookie } from './types';
import { COOKIE_NAME } from '@src/globalTypes';

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

  async issueUserAuthTokensCookies(user: User) {
    const config = getConfig();

    const tokens = await this.tokenService.generateAuthTokens(user);

    const refreshTokenCookieExpires =
      86400000 * config.jwt.refreshExpirationDays;
    const accessTokenCookieExpires = 60000 * config.jwt.accessExpirationMinutes;

    const refreshTokenCookie: UserAuthTokenCookie = {
      name: COOKIE_NAME.REFRESH_TOKEN,
      options: {
        httpOnly: false,
        path: '/',
        maxAge: refreshTokenCookieExpires,
      },
      value: tokens.refreshToken,
    };

    const accessTokenCookie: UserAuthTokenCookie = {
      name: COOKIE_NAME.ACCESS_TOKEN,
      options: {
        httpOnly: false,
        path: '/',
        maxAge: accessTokenCookieExpires,
      },
      value: tokens.accessToken,
    };

    return {
      accessTokenCookie,
      refreshTokenCookie,
      saveCookieToResponse: (response: Response) => {
        response.cookie(
          refreshTokenCookie.name,
          refreshTokenCookie.value,
          refreshTokenCookie.options,
        );

        response.cookie(
          accessTokenCookie.name,
          accessTokenCookie.value,
          accessTokenCookie.options,
        );
      },
    };
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
