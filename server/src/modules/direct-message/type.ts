import { DirectMessage, User } from '@src/entities';

export type GetDirectMessagesPayload = {
  pagination: Partial<{
    page: number;
    pageSize: number;
    skip: number;
  }>;

  senderId: number;
  recipientId: number;
};

export type DirectMessagesChat = {
  lastMessage: DirectMessage;
  user: User;
  unreadMessages: number;
};
