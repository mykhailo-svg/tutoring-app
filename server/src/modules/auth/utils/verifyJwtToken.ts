import { getConfig } from '@src/config';
import type { AuthUser } from '@src/globalTypes';
import * as jwt from 'jsonwebtoken';

export const verifyJwtToken = <Response = AuthUser>(
  token: string | null | undefined,
) => {
  let payload: Response | null = null;

  const config = getConfig();

  if (token) {
    try {
      payload = jwt.verify(token, config.jwt.secretKey, {
        algorithms: ['HS256'],
      }) as typeof payload;
    } catch (error) {}
  }

  return payload;
};
