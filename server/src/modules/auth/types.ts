import { COOKIE_NAME } from '@src/globalTypes';
import { CookieOptions } from 'express';

export type UserAuthTokenCookie = {
  name: COOKIE_NAME.ACCESS_TOKEN | COOKIE_NAME.REFRESH_TOKEN;
  options: CookieOptions;
  value: string;
};
