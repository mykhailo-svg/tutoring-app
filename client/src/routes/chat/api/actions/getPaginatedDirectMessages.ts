import { APIEndpoints, axiosClient, getApiEndpointUrl } from '@/api';
import type { User } from '@/global_types';

export const getPaginatedDirectMessages = async (
  companionId: User['id'],
  { paginationData }: GetPaginatedDirectMessagesPayload,
  messagesGotFromWebsockets: number = 0
) => {
  const messagesRequestUrl = new URL(
    getApiEndpointUrl(APIEndpoints.directMessages.get(companionId))
  );

  for (const paginationDataKey in paginationData) {
    messagesRequestUrl.searchParams.set(
      paginationDataKey,
      (paginationData as any)[paginationDataKey]
    );
  }

  messagesRequestUrl.searchParams.set('skip', `${messagesGotFromWebsockets}`);

  const directMessagesResponse = await axiosClient.get(messagesRequestUrl.href);

  return directMessagesResponse.data;
};

export type GetPaginatedDirectMessagesPayload = {
  paginationData: Partial<{
    pageSize: number;
    page: number;
  }>;
};
