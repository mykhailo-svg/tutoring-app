import { useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const auth = useContext(AuthContext);

  const logout = useCallback(() => {
    auth.setAuthState(() => ({ user: null }));
  }, [auth.setAuthState]);

  return { ...auth, logout };
};
