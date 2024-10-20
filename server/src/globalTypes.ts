import { Request } from 'express';
import { User } from './modules/user/entities/user.entity';

// User

export type SafeUser = Omit<User, 'password'>;

// Auth
export type AuthUser = {
  email: string;
  id: number;
};

export type AuthProtectedRequest = Request & { user: AuthUser };
