import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Validation } from '@src/decorators';
import { AuthProtectedRequest } from '@src/globalTypes';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto';

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

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userId = parseInt(`${id}`);

    if (!isFinite(userId)) {
      throw new BadRequestException('Malformed user id');
    }

    const existingUser = await this.userService.getById({ id: userId });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return this.userService.removeSensitiveData(existingUser);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  public async uploadFile(
    @UploadedFile() file,
    @Req() req: AuthProtectedRequest,
  ) {
    return this.userService.uploadUserAvatarImage(file, req.user.id);
  }

  @Put('')
  @Auth()
  @Validation()
  public async updateUserGeneralData(
    @Req() req: AuthProtectedRequest,
    @Body() dto: UpdateUserDto,
  ) {
    await this.userService.updateUserGeneralData(req.user.id, dto);
  }
}
