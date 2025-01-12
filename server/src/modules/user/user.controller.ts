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
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    const formData = new FormData();

    // Convert the file buffer to a binary string (not base64)
    const binaryFile = file.buffer.toString('binary');

    console.log('Binary File Data:', binaryFile); // Debugging log to see the binary string

    // Append necessary fields to the form data
    formData.append('expires', '2025-01-12T20:00:00');
    formData.append('autoDelete', 'true');
    // Append the file buffer directly as raw binary (FormData will handle it)
    formData.append('file', file.buffer);

    const upload = await fetch('https://file.io/', {
      body: formData,
      method: 'POST',
      headers: {
        authorization: 'Bearer PLB4IE7.HB78Z7N-9J645DF-GGEPPX7-MGCD1S3',
      },
    });

    console.log(upload.status);
    console.log(upload.body);
    console.log(await upload.json());

    return file;
  }
}
