// Clerk auth middleware
// Uncomment and replace when Clerk is configured
// import { clerkMiddleware } from '@clerk/nextjs/server';
// export default clerkMiddleware();

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pass through all requests for now
  // This will be replaced with Clerk middleware once auth is configured
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
