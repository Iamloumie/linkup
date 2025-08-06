// middleware.ts

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes that you want to protect.
// All other routes will be public by default.
const isProtectedRoute = createRouteMatcher([
  // Add the protected routes here
  // For example: '/dashboard(.*)', '/settings'

]);

// Define routes to be ignored by the middleware
const isIgnoredRoute = createRouteMatcher([
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

export default clerkMiddleware((auth, req) => {
  // If the route is not ignored, check for protection
  if (!isIgnoredRoute(req)) {
    // If the route is protected, enforce authentication
    if (isProtectedRoute(req)) {
      auth.protect();
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};