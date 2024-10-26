import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';
import { getConfig } from '../../config/config';
import { Request, Response } from 'express';
import { LoginDto, LogoutDto, RefreshTokenDto } from './dto';
import { RegisterEndpointDescriptor } from './swagger';
import { Validation } from '../../decorators';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/entities/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @Post('register')
  @RegisterEndpointDescriptor()
  @Validation()
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    const user = await this.authService.checkIfUserExists(dto);

    const tokens = await this.tokenService.generateAuthTokens(user);

    const config = getConfig();

    const refreshTokenCookieExpires =
      86400000 * config.jwt.refreshExpirationDays;

    const accessTokenCookieExpires = 60000 * config.jwt.accessExpirationMinutes;

    res.cookie('RefreshToken', tokens.refreshToken, {
      httpOnly: false,
      path: '/',
      maxAge: refreshTokenCookieExpires,
    });
    res.cookie('AccessToken', tokens.accessToken, {
      httpOnly: false,
      path: '/',
      maxAge: accessTokenCookieExpires,
    });

    return { user, tokens };
  }

  @Validation()
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    const { user } = await this.authService.login(dto);

    const { name, password, email, isEmailVerified, id } = user;

    const tokens = await this.tokenService.generateAuthTokens({
      email,
      password,
      isEmailVerified,
      name,
      id,
    });

    const config = getConfig();

    const refreshTokenCookieExpires =
      86400000 * config.jwt.refreshExpirationDays;

    const accessTokenCookieExpires = 60000 * config.jwt.accessExpirationMinutes;

    res.cookie('RefreshToken', tokens.refreshToken, {
      httpOnly: false,
      path: '/',
      maxAge: refreshTokenCookieExpires,
    });
    res.cookie('AccessToken', tokens.accessToken, {
      httpOnly: false,
      path: '/',
      maxAge: accessTokenCookieExpires,
    });

    return user;
  }

  @Post('refresh')
  @Validation()
  async refreshTokens(@Res({ passthrough: true }) res: Response, @Body() dto) {
    const config = getConfig();

    let user: null | User = null;

    console.log(dto);

    try {
      user = jwt.verify(dto.refreshToken, config.jwt.secretKey, {
        algorithms: ['HS256'],
      }) as User;
    } catch (error) {}

    if (user) {
      const tokens = await this.tokenService.generateAuthTokens({
        ...user,
      });

      const refreshTokenCookieExpires =
        86400000 * config.jwt.refreshExpirationDays;

      const accessTokenCookieExpires =
        60000 * config.jwt.accessExpirationMinutes;

      res.cookie('RefreshToken', tokens.refreshToken, {
        httpOnly: false,
        path: '/',
        maxAge: refreshTokenCookieExpires,
      });
      res.cookie('AccessToken', tokens.accessToken, {
        httpOnly: false,
        path: '/',
        maxAge: accessTokenCookieExpires,
      });
      return {
        ...tokens,
      };
    } else {
      console.log('error');

      throw new UnauthorizedException('Not valid refresh token');
    }
  }

  @Put('logout')
  @Validation()
  async logout(@Body() dto: LogoutDto) {
    console.log(dto.refreshToken);

    await this.authService.logout(dto.refreshToken);
  }
}
