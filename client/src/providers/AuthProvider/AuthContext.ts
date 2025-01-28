'use client';

import { User } from '@/global_types';
import { createContext } from 'react';

export type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
};

export type AuthContextDataMutate = (
  callback: (previousData: AuthContextData) => Partial<AuthContextData>
) => void;

export type AuthContextType = { data: AuthContextData; setAuthState: AuthContextDataMutate };

export const AuthContext = createContext<AuthContextType>({
  data: {
    user: null,
    isAuthenticated: false,
  },
  setAuthState: () => {},
});
