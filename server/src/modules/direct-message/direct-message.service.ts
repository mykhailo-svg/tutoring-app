import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectMessage, User } from '@src/entities';
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
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

    this.getChats(sender.id);

    return messages;
  }

  async getChats(userId: User['id']) {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from(DirectMessage, 'dm')
          .where(
            '(dm.senderId = :currentUserId AND dm.recipientId = user.id) OR (dm.senderId = user.id AND dm.recipientId = :currentUserId)',
          )
          .getQuery();
        return `EXISTS (${subQuery})`;
      })
      .setParameter('currentUserId', userId)
      .getMany();

    console.log(users);
  }
}
