import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectMessage } from '@src/entities';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
// import { UserService } from '../user/user.service';

type CreateDirectMessagePayload = {
  message: { senderId: number; recipientId: number; content: string };
};

@Injectable()
export class DirectMessageService {
  constructor(
    @InjectRepository(DirectMessage)
    private directMessagesRepository: Repository<DirectMessage>,
    private userService: UserService,
  ) {}

  async createDirectMessage({ message }: CreateDirectMessagePayload) {
    const recipientUser = await this.userService.getById({
      id: message.recipientId,
    });

    const senderUser = await this.userService.getById({
      id: message.senderId,
    });

    console.log(senderUser);
    console.log(recipientUser);

    if (!senderUser || !recipientUser) {
      return;
    }

    await this.directMessagesRepository.save([
      {
        content: message.content,
        recipient: recipientUser,
        sender: senderUser,
      },
    ]);

    console.log(await this.directMessagesRepository.find());
  }

  async getPaginatedMessages({
    senderId,
    recipientId,
  }: {
    senderId: number;
    recipientId: number;
  }) {
    const recipient = await this.userService.getById({
      id: recipientId,
    });

    const sender = await this.userService.getById({
      id: senderId,
    });

    const messages = await this.directMessagesRepository.find({
      loadRelationIds: true,
    });

    return messages;
  }
}
