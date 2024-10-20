import { COOKIES_NAME } from '@/global_types';
import { cookies } from 'next/headers';

export const createAuthHeaders = () => {
  let accessToken: null | string = null;

  const accessTokenCookie = cookies().get(COOKIES_NAME.ACCESS_TOKEN);
  if (accessTokenCookie) {
    accessToken = accessTokenCookie.value;
  }

  const headers = { Authorization: `Bearer ${accessToken}` };

  return headers;
};
