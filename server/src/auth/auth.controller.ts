import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: CreateUserDto) {
    console.log(dto);

    const existingUser = await this.userService.findExistingUser({
      email: dto.email,
    });

    if (existingUser) {
      throw new ConflictException('User already exists!');
    }

    const createdUser = await this.userService.createUser(dto);

    return createdUser;
  }
}
