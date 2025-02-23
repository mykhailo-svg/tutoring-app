'use client';
import { useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';
import jsCookies from 'js-cookie';
import { COOKIES_NAME } from '@/global_types';
import { redirect, useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/shared/constants/routes';
import { APIEndpoints, axiosClient } from '@/api';
import cookies from 'js-cookie';

type LogoutRequestPayload = { refreshToken: string | undefined | null };

export const useAuth = () => {
  const auth = useContext(AuthContext);

  const router = useRouter();

  console.log(auth);

  const logout = useCallback(() => {
    const refreshToken = cookies.get(COOKIES_NAME.REFRESH_TOKEN);

    try {
      axiosClient.put<any, any, LogoutRequestPayload>(APIEndpoints.auth.logout, { refreshToken });
    } catch (error) {}

    auth.setAuthState(() => ({ user: null }));
    jsCookies.remove(COOKIES_NAME.ACCESS_TOKEN);
    jsCookies.remove(COOKIES_NAME.REFRESH_TOKEN);

    redirect(APP_ROUTES.auth.login);
  }, [auth]);

  return { ...auth, logout };
};
