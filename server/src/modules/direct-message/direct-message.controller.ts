import { Controller, Get, NotFoundException, Param, Req } from '@nestjs/common';
import { Auth } from '@src/decorators';
import { AuthProtectedRequest } from '@src/globalTypes';
import { DirectMessageService } from './direct-message.service';

@Controller('direct-message')
export class DirectMessageController {
  constructor(private readonly directMessagesService: DirectMessageService) {}

  @Get(':id')
  @Auth()
  async getMessages(@Req() req: AuthProtectedRequest, @Param('id') id: string) {
    const user = req.user;

    const recipientId = parseInt(id);

    return this.directMessagesService.getPaginatedMessages({
      senderId: user.id,
      recipientId,
    });
  }

  @Get()
  @Auth()
  async getChats(@Req() req: AuthProtectedRequest) {
    const user = req.user;

    return this.directMessagesService.getChats(user.id);
  }
}
