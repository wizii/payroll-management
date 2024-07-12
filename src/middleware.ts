import type { NextRequest } from 'next/server';
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired(async function middleware(request: NextRequest) {
  try {
    const appSession = request.cookies.get('appSession')?.value;

    console.log('Middleware executed');
    console.log('Request URL:', request.url);
    console.log('App session:', appSession);

    if (appSession && !request.nextUrl.pathname.startsWith('/')) {
      return Response.redirect(new URL('/', request.url));
    }

    if (!appSession && !request.nextUrl.pathname.startsWith('/')) {
      return Response.redirect(new URL('/login', request.url));
    }

    return new Response('Next response');
  } catch (error) {
    console.error('Error in middleware:', error);
    return new Response('Middleware error', { status: 500 });
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};