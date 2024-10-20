import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const authData = useContext(AuthContext);

  return {
    authData,
  };
};
