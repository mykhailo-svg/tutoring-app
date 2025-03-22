export type GetDirectMessagesPayload = {
  pagination: Partial<{
    page: number;
    pageSize: number;
    skip: number;
  }>;

  senderId: number;
  recipientId: number;
};
