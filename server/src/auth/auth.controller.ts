import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { TokenService } from 'src/token/token.service';
import { AuthService } from './auth.service';
import { getConfig } from 'src/config/config';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}


  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    const user = await this.authService.checkIfUserExists(dto);

    const tokens = await this.tokenService.generateAuthTokens(user);

    res.setHeader(
      'Set-Cookie',
      'Authy=hello-nestsssssssssssssssss; Path=/; SameSite=None; Secure',
    );

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    return { user, tokens };
  }
}
