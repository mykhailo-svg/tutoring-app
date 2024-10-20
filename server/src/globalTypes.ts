import { Request } from 'express';

export type AuthUser = {
  email: string;
  id: number;
};

export type AuthProtectedRequest = Request & { user: AuthUser };
