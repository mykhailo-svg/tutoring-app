import { Request } from 'express';
import { User } from './entities/user.entity';

// User

export type SafeUser = Omit<User, 'password'>;

// Auth
export type AuthUser = {
  email: string;
  id: number;
};

export enum USER_ROLE {
  STUDENT = 'STUDENT',
  OWNER = 'OWNER',
}

export type AuthProtectedRequest = Request & { user: AuthUser };

// Cookies

export enum COOKIE_NAME {
  REFRESH_TOKEN = 'RefreshToken',
  ACCESS_TOKEN = 'AccessToken',
}
