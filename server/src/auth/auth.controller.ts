import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: UserService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    console.log(dto);

    const createdUser = await this.userService.createUser(dto);

    return createdUser;
  }
}
