'use client';

import { ReactNode, useState } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

type AuthProviderProps = {
  initialData: AuthContextType;
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ initialData, children }) => {
  const [authState, setAuthState] = useState<AuthContextType>(initialData);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};
