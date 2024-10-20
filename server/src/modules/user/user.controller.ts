import { Controller, Get, NotFoundException, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators';
import { AuthProtectedRequest } from 'src/globalTypes';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async revealUser(@Req() req: AuthProtectedRequest) {
    const existingUser = await this.userService.getById({ id: req.user.id });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return this.userService.removeSensitiveData(existingUser);
  }
}
