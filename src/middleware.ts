import { auth } from '@/lib/auth';

export default auth((req) => {
  if (!req.auth) {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|sign-up|images|$).*)',
  ],
};
