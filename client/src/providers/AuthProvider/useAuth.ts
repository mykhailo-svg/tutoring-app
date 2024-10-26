'use client';
import { useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';
import jsCookies from 'js-cookie';
import { COOKIES_NAME } from '@/global_types';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/shared/constants/routes';
import { APIEndpoints, axiosClient } from '@/api';
import cookies from 'js-cookie';

type LogoutRequestPayload = { refreshToken: string | undefined | null };

export const useAuth = () => {
  const auth = useContext(AuthContext);

  const router = useRouter();

  const logout = useCallback(() => {
    const refreshToken = cookies.get(COOKIES_NAME.REFRESH_TOKEN);

    try {
      axiosClient.put<any, any, LogoutRequestPayload>(APIEndpoints.auth.logout, { refreshToken });
    } catch (error) {}

    auth.setAuthState(() => ({ user: null }));
    jsCookies.remove(COOKIES_NAME.ACCESS_TOKEN);
    jsCookies.remove(COOKIES_NAME.REFRESH_TOKEN);

    router.push(appRoutes.auth.login);
  }, [auth.setAuthState]);

  return { ...auth, logout };
};
