import { MiddlewareConfig, NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = (request) => {
  if (request.nextUrl.pathname.startsWith('/auth/login')) {
    const response = NextResponse.next();

    console.log('login');

    // SET MIDDLEWARE NO-CACHE HEADER
    response.headers.set('x-middleware-cache', 'no-cache');
    response.headers.set('Cache-Control', 'no-store');

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
