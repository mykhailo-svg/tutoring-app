import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/decorators';
import { AuthProtectedRequest } from '@src/globalTypes';
import { FileInterceptor } from '@nestjs/platform-express';
import { getConfig } from '@src/config';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file) {
    const config = getConfig();

    const formData = new FormData();

    formData.append('key', config.ibbImagesStorage.apiKey);
    formData.append('image', file.buffer.toString('base64'));

    const upload = await fetch('https://api.imgbb.com/1/upload', {
      body: formData,
      method: 'POST',
    });

    return upload.json();
  }
}
