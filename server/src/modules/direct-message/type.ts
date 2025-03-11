export type GetDirectMessagesPayload = {
  pagination: Partial<{
    page: number;
    pageSize: number;
  }>;
  senderId: number;
  recipientId: number;
};
