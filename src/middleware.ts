import type { NextRequest } from 'next/server'
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
 
export default withMiddlewareAuthRequired(async function middleware(request: NextRequest) {
// const { user } = await getSession();
// console.log(user)

  const appSession = request.cookies.get('appSession')?.value

  console.log(appSession)
 
  if (appSession && !request.nextUrl.pathname.startsWith('/')) {
    return Response.redirect(new URL('/', request.url))
  }
 
  if (!appSession && !request.nextUrl.pathname.startsWith('/')) {
    return Response.redirect(new URL('/login', request.url))
  }
});
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}