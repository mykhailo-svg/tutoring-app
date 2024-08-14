import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res({ passthrough: true }) res: Response) {
    res.setHeader(
      'Set-Cookie',
      '12123hello-asdasdnest=hello-nestsssssssssssssssss; Path=/; SameSite=None; Secure',
    );

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    return 'sds';
  }
}
