import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Req,
} from '@nestjs/common';
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

    const formatQueryParam = (
      param: AuthProtectedRequest['query']['value'],
    ) => {
      return isFinite(parseInt(param as string))
        ? parseInt(param as string)
        : undefined;
    };

    return this.directMessagesService.getPaginatedMessages({
      senderId: user.id,
      recipientId,
      pagination: {
        pageSize: formatQueryParam(req.query.pageSize),
        page: formatQueryParam(req.query.pageSize),
      },
    });
  }

  @Get()
  @Auth()
  async getChats(@Req() req: AuthProtectedRequest) {
    const user = req.user;

    console.log(req.query.search);

    return this.directMessagesService.getChats(user.id, {
      filters: {
        query: req.query.search as string | undefined,
      },
    });
  }

  @Put('/read/:id')
  @Auth()
  async setIsReadToAllMessages(
    @Req() req: AuthProtectedRequest,
    @Param('id', {
      transform: (id) => {
        const parsedId = parseInt(id);

        return isFinite(parsedId) ? parsedId : null;
      },
    })
    senderId: number | null,
  ) {
    const user = req.user;

    if (!senderId) {
      throw new BadRequestException('Invalid sender user id');
    }

    return this.directMessagesService.setAllMessagesRead(senderId, user.id);
  }
}
