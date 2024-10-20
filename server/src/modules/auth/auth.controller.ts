import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';
import { getConfig } from '../../config/config';
import { Response } from 'express';
import { LoginDto } from './dto';
import { RegisterEndpointDescriptor } from './swagger';
import { Auth, Validation } from '../../decorators';
import { AuthProtectedRequest } from 'src/globalTypes';

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
    const {
      user: { email, password, isEmailVerified, name, id },
    } = await this.authService.login(dto);

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

    return {};
  }

  @Get('/')
  @Auth()
  async revealUser(@Req() req: AuthProtectedRequest) {
    console.log(req.user);

    return {};
  }
}
