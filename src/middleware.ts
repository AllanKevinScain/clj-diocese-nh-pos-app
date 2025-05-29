import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(async function middleware() {
  return NextResponse.next();
});

export const config = {
  matcher: ['/logout', '/courses'],
};
