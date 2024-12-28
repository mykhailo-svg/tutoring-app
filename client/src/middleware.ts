import { NextMiddleware, NextResponse } from 'next/server';
import { createAuthHeaders } from './shared/helpers';
import { APIEndpoints, getApiEndpointUrl } from './api';
import { cookies } from 'next/headers';
import { COOKIES_NAME } from './global_types';
import { HttpStatusCode } from 'axios';
import { APP_ROUTES } from './shared/constants/routes';
import { revalidatePath } from 'next/cache';

export const middleware: NextMiddleware = async (request) => {
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, must-revalidate');
  const cookiesClient = await cookies();

  const isOnAuthPage =
    request.nextUrl.pathname === APP_ROUTES.auth.login ||
    request.nextUrl.pathname === APP_ROUTES.auth.register;

  const refreshToken = cookiesClient.get(COOKIES_NAME.REFRESH_TOKEN)?.value;
  const accessToken = cookiesClient.get(COOKIES_NAME.ACCESS_TOKEN)?.value;

  const loginPageUrl = new URL(APP_ROUTES.auth.login, request.url);

  if (!isOnAuthPage && !accessToken && !refreshToken) {
    return NextResponse.redirect(loginPageUrl);
  }

  let isUnAuthorized = true;

  // Trying to get current user
  try {
    const authHeaders = await createAuthHeaders();

    const userResponse = await fetch(getApiEndpointUrl(APIEndpoints.user.revealCurrent), {
      method: 'GET',
      credentials: 'include',
      headers: { ...authHeaders },
    });

    isUnAuthorized = userResponse.status === HttpStatusCode.Unauthorized;
  } catch (error) {}

  // Trying to refresh tokens
  if (isUnAuthorized) {
    const refreshPayload = {
      refreshToken: refreshToken,
    };

    try {
      const refreshedTokensResponse = await fetch(getApiEndpointUrl(APIEndpoints.auth.refresh), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshPayload),
      });

      const refreshedData = await refreshedTokensResponse.json();

      if (refreshedData.accessToken) {
        response.cookies.set(COOKIES_NAME.ACCESS_TOKEN, refreshedData.accessToken);
      }
      if (refreshedData.refreshToken) {
        response.cookies.set(COOKIES_NAME.REFRESH_TOKEN, refreshedData.refreshToken);
      }
    } catch (error) {
      return NextResponse.redirect(loginPageUrl);
    }
  } else if (isOnAuthPage) {
    return NextResponse.redirect(new URL(APP_ROUTES.home, request.url));
  }

  return response;
};

export const config = {
  matcher: ['/', '/auth/login', '/auth/register'],
};
