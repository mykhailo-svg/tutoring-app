import { COOKIES_NAME } from '@/global_types';
import { NextRequest } from 'next/server';

export const createAuthHeaders = (request: NextRequest) => {
  let accessToken: null | string = null;

  const accessTokenCookie = request.cookies.get(COOKIES_NAME.ACCESS_TOKEN);
  if (accessTokenCookie) {
    accessToken = accessTokenCookie.value;
  }

  const headers = { Cookie: `${COOKIES_NAME.ACCESS_TOKEN}="${accessToken}"` };

  return headers;
};
