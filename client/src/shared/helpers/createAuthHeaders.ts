import { COOKIES_NAME } from '@/global_types';
import { cookies } from 'next/headers';

export const createAuthHeaders = async () => {
  let accessToken: null | string = null;

  const cookiesClient = await cookies();

  const accessTokenCookie = cookiesClient.get(COOKIES_NAME.ACCESS_TOKEN);

  if (accessTokenCookie) {
    accessToken = accessTokenCookie.value;
  }

  const headers = { Authorization: `Bearer ${accessToken}` };

  return headers;
};
