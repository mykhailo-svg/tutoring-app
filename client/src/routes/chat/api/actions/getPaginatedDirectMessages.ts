import { APIEndpoints, axiosClient, getApiEndpointUrl } from '@/api';
import type { User } from '@/global_types';

export const getPaginatedDirectMessages = async (
  companionId: User['id'],
  { paginationData }: GetPaginatedDirectMessagesPayload
) => {
  const chatsRequestUrl = new URL(getApiEndpointUrl(APIEndpoints.directMessages.get(companionId)));

  for (const paginationDataKey in paginationData) {
    chatsRequestUrl.searchParams.set(paginationDataKey, (paginationData as any)[paginationDataKey]);
  }

  const directMessagesResponse = await axiosClient.get(chatsRequestUrl.href);

  return directMessagesResponse.data;
};

export type GetPaginatedDirectMessagesPayload = {
  paginationData: Partial<{
    pageSize: number;
    page: number;
  }>;
};
