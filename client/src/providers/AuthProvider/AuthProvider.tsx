'use client';

import { ReactNode, useCallback, useState } from 'react';
import {
  AuthContext,
  AuthContextData,
  AuthContextDataMutate,
  AuthContextType,
} from './AuthContext';

type AuthProviderProps = {
  initialData: AuthContextData;
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ initialData, children }) => {
  const [authState, setAuthState] = useState<AuthContextData>(initialData);

  const mutateAuthState: AuthContextDataMutate = useCallback(
    (callback) => {
      setAuthState((prevState) => ({ ...prevState, ...callback(prevState) }));
    },
    [setAuthState]
  );

  return (
    <AuthContext.Provider value={{ data: authState, setAuthState: mutateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
