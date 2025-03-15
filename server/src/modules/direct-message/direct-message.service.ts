import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectMessage, User } from '@src/entities';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { GetDirectMessagesPayload } from './type';
import { GET_DIRECT_MESSAGES_PAGINATION_DEFAULT_DATA } from './constants';
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
  }

  async getPaginatedMessages({
    senderId,
    recipientId,
    pagination: {
      pageSize = GET_DIRECT_MESSAGES_PAGINATION_DEFAULT_DATA.pageSize,
      page = GET_DIRECT_MESSAGES_PAGINATION_DEFAULT_DATA.page,
    },
  }: GetDirectMessagesPayload) {
    console.log(page);

    const messages = await this.directMessagesRepository.find({
      loadRelationIds: true,
      skip: page * pageSize,
      take: pageSize,
      order: { createdAt: 'ASC' },
      where: [
        { sender: { id: senderId }, recipient: { id: recipientId } },
        { sender: { id: recipientId }, recipient: { id: senderId } },
      ],
    });

    return messages;
  }

  async getChats(userId: User['id'], paginationData: GetChatsPaginationData) {
    const queriesChats: (User & DirectMessage & { unreadmessages: string })[] =
      await this.usersRepository.query(
        getChatsQuerySQL(userId, paginationData),
      );

    return queriesChats.map((chat) => {
      const companionId = //@ts-ignore
        `${userId}` === `${chat.recipientId}` //@ts-ignore
          ? chat.senderId //@ts-ignore
          : chat.recipientId;

      return {
        user: {
          id: companionId,
          content: chat.content,
          name: chat.name,
          avatar: chat.avatar,
        },
        lastMessage: { content: chat.content },
        unreadMessages: parseInt(chat.unreadmessages),
      };
    });
  }

  async setAllMessagesRead(senderId: User['id'], recipientId: User['id']) {
    await this.directMessagesRepository.update(
      {
        sender: { id: senderId },
        recipient: { id: recipientId },
        isRead: false,
      },
      { isRead: true },
    );
  }
}

function getChatsQuerySQL(
  userId: number,
  paginationData?: GetChatsPaginationData,
) {
  const searchCondition = paginationData.filters.query
    ? `AND (senderUser.name ILIKE '%${paginationData.filters.query}%' OR recipientUser.name ILIKE '%${paginationData.filters.query}%')`
    : '';

  return `
    WITH latest_messages AS (
      -- Find the latest message between the user and each chat participant
      SELECT DISTINCT ON (LEAST(dm."senderId", dm."recipientId"), GREATEST(dm."senderId", dm."recipientId"))
        dm.* 
      FROM "direct_message" dm
      WHERE dm."senderId" = ${userId} OR dm."recipientId" = ${userId}
      ORDER BY 
        LEAST(dm."senderId", dm."recipientId"), 
        GREATEST(dm."senderId", dm."recipientId"),
        dm."createdAt" DESC
    ),
    unread_counts AS (
      -- Count unread messages where current user is the recipient
      SELECT 
        dm."senderId",
        dm."recipientId",
        COUNT(*) AS unreadMessages
      FROM "direct_message" dm
      WHERE dm."recipientId" = ${userId} AND dm."isRead" = FALSE
      GROUP BY dm."senderId", dm."recipientId"
    )

    SELECT 
      u.*, 
      lm.*, 
      COALESCE(uc.unreadMessages, 0) AS unreadMessages
    FROM "user" u
    JOIN latest_messages lm 
      ON u.id = lm."senderId" OR u.id = lm."recipientId"
    LEFT JOIN unread_counts uc 
      ON (uc."senderId" = u.id AND uc."recipientId" = ${userId})

    -- Join users to check names (sender and recipient)
    JOIN "user" senderUser ON lm."senderId" = senderUser.id
    JOIN "user" recipientUser ON lm."recipientId" = recipientUser.id

    WHERE u.id <> ${userId}
    ${searchCondition}  -- Apply name filter dynamically

    ORDER BY 
      CASE 
        WHEN lm."isRead" = FALSE AND lm."senderId" <> ${userId} THEN 0 -- Unread first
        ELSE 1 
      END, 
      lm."createdAt" DESC;
  `;
}

type GetChatsPaginationData = {
  filters?: Partial<{
    query: string;
  }>;
};
