import { APIEndpoints, axiosClient, getApiEndpointUrl } from '@/api';
import { DirectChatsQueryingData } from '../../hooks';
import { GetDirectMessengerChatsResponse } from '../../types';

export const getPaginatedUserChats = async ({
  filters,
  page,
  pageSize,
}: DirectChatsQueryingData) => {
  const chatsRequestUrl = new URL(getApiEndpointUrl(APIEndpoints.directMessages.getChats));

  if (filters?.search) {
    chatsRequestUrl.searchParams.set('search', filters.search);
  }

  chatsRequestUrl.searchParams.set('page', page.toString());
  chatsRequestUrl.searchParams.set('pageSize', pageSize.toString());

  const chatsResponse = await axiosClient.get<any, { data: GetDirectMessengerChatsResponse }>(
    chatsRequestUrl.href
  );

  console.log(chatsResponse.data);

  return chatsResponse.data;
};
