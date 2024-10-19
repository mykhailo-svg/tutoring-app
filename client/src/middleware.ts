import { MiddlewareConfig, NextMiddleware, NextResponse } from 'next/server';
import { createAuthHeaders } from './shared/helpers';

export const middleware: NextMiddleware = (request) => {
  if (request.nextUrl.pathname.startsWith('/auth/login')) {
    const response = NextResponse.next();

    const authHeaders = createAuthHeaders(request);

    fetch('http://localhost:5000/api/auth/get', {
      method: 'GET',
      credentials: 'include',
      headers: authHeaders,
    });

    return response;
  }
};

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
