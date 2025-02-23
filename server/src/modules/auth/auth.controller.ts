import {
  Body,
  Controller,
  Post,
  Put,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { getConfig } from '../../config/config';
import { Response } from 'express';
import { LoginDto, LogoutDto } from './dto';
import { RegisterEndpointDescriptor } from './swagger';
import { Validation } from '../../decorators';
import * as jwt from 'jsonwebtoken';
import { User } from '@entities';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
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

    const { saveCookieToResponse } =
      await this.authService.issueUserAuthTokensCookies(user);

    saveCookieToResponse(res);

    return {
      user: this.userService.removeSensitiveData(user),
    };
  }

  @Validation()
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    const { user } = await this.authService.login(dto);

    const { saveCookieToResponse } =
      await this.authService.issueUserAuthTokensCookies(user);

    saveCookieToResponse(res);

    return { user };
  }

  @Post('refresh')
  @Validation()
  async refreshTokens(@Res({ passthrough: true }) res: Response, @Body() dto) {
    const config = getConfig();

    let user: null | User = null;

    const dbRefreshToken = await this.tokenService.getRefreshToken(
      dto.refreshToken,
    );

    if (!dbRefreshToken) {
      throw new UnauthorizedException('Not valid refresh token');
    }

    try {
      user = jwt.verify(dbRefreshToken.value, config.jwt.secretKey, {
        algorithms: ['HS256'],
      }) as User;
    } catch (error) {}

    if (user) {
      const { saveCookieToResponse, refreshTokenCookie, accessTokenCookie } =
        await this.authService.issueUserAuthTokensCookies(user);

      saveCookieToResponse(res);

      return {
        ...{
          refreshToken: refreshTokenCookie.value,
          accessToken: accessTokenCookie.value,
        },
      };
    } else {
      throw new UnauthorizedException('Not valid refresh token');
    }
  }

  @Put('logout')
  @Validation()
  async logout(@Body() dto: LogoutDto) {
    await this.authService.logout(dto.refreshToken);
  }
}
