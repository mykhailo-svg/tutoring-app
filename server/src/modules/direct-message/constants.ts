import { GetDirectMessagesPayload } from './type';

export const GET_DIRECT_MESSAGES_PAGINATION_DEFAULT_DATA: GetDirectMessagesPayload['pagination'] =
  {
    pageSize: 25,
    page: 0,
    skip: 0,
  };
