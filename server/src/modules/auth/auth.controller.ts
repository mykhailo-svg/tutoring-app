import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';
import { getConfig } from '../../config/config';
import { Request, Response } from 'express';
import { LoginDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @Post('register')
  @ApiResponse({
    schema: {
      default: {
        tokens: {
          accessToken: 'token',
          refreshToken: 'token',
        },
        user: {
          id: 1,
          password: 'hashed password',
          email: 'email',
          name: 'name',
          isEmailVerified: false,
        },
      },
    },
    status: HttpStatus.OK,
  })
  @ApiResponse({
    schema: {
      default: {
        message: 'User already exists!',
        error: 'Conflict',
        statusCode: HttpStatus.CONFLICT,
      },
    },
    status: HttpStatus.CONFLICT,
  })
  @ApiResponse({
    schema: {
      default: {
        message: 'Bad request!',
        error: 'Bad request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
    },
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new ValidationPipe())
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
      httpOnly: true,
      path: '/',
      maxAge: refreshTokenCookieExpires,
    });

    res.cookie('AccessToken', tokens.accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: accessTokenCookieExpires,
    });

    return { user, tokens };
  }

  @UsePipes(new ValidationPipe())
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
      httpOnly: true, // Secure and inaccessible via JavaScript
      secure: false, // Use `true` if in production (HTTPS)
      sameSite: 'none',
    });
    res.cookie('AccessToken', tokens.accessToken, {
      domain: 'http://localhost:5000',
      httpOnly: true, // Secure and inaccessible via JavaScript
      secure: false, // Use `true` if in production (HTTPS)
      sameSite: 'none',
    });

    return {};
  }

  @Get('/get')
  async revealUser(@Req() req: Request) {
    console.log(req.cookies);

    return {};
  }
}
