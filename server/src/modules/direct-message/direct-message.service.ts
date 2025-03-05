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
    const messages = await this.directMessagesRepository.find({
      loadRelationIds: true,
      where: [
        { sender: { id: senderId }, recipient: { id: recipientId } },
        { sender: { id: recipientId }, recipient: { id: senderId } },
      ],
    });

    return messages;
  }

  async getChats(userId: User['id']) {
    const queriesChats: (User & DirectMessage)[] = await this.usersRepository
      .query(`SELECT u.*, latestMessage.*
FROM "user" u
LEFT JOIN LATERAL (
    SELECT *
    FROM "direct_message" dm
    WHERE 
        (dm."senderId" = u.id AND dm."recipientId" = 42)
        OR (dm."senderId" = 42 AND dm."recipientId" = u.id)
    ORDER BY dm."createdAt" DESC
    LIMIT 1
) latestMessage ON TRUE
WHERE u.id <> 42
ORDER BY 
    (CASE 
        WHEN latestMessage."isRead" = FALSE AND latestMessage."senderId" <> 42 THEN 0  -- Unread messages first
        ELSE 1 
    END)

`);
    console.log(queriesChats);

    return queriesChats.map((chat) => {
      //@ts-ignore
      console.log(chat.senderId);
      return {
        user: {
          //@ts-ignore
          id: chat.recipientId,
          content: chat.content,
          name: chat.name,
        },
        lastMessage: { content: chat.content },
      };
    });
  }
}
