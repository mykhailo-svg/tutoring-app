'use client';

import { User } from '@/global_types';
import { createContext } from 'react';

export type AuthContextType = { user: User | null };

export const AuthContext = createContext<AuthContextType>({ user: null });
