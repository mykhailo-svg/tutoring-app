import { NextMiddleware, NextResponse } from 'next/server';
import { createAuthHeaders } from './shared/helpers';
import { APIEndpoints, getApiEndpointUrl } from './api';
import { cookies } from 'next/headers';
import { COOKIES_NAME, User } from './global_types';
import { HttpStatusCode } from 'axios';
import { appRoutes } from './shared/constants/routes';

export const middleware: NextMiddleware = async (request) => {
  const response = NextResponse.next();

  const authHeaders = await createAuthHeaders();

  const cookiesClient = await cookies();

  const refreshToken = cookiesClient.get(COOKIES_NAME.REFRESH_TOKEN)?.value;

  let isUnAuthorized = true;

  // Trying to get current user
  try {
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
          'Content-Type': 'application/json', // Inform the backend that you're sending JSON
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
      return NextResponse.redirect(appRoutes.auth.login);
    }
  }

  return response;
};

export const config = {
  matcher: [appRoutes.home],
};
