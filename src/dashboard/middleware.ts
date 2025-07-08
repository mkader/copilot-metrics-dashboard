// src/dashboard/middleware.ts

// Re-export the default middleware from next-auth
// This will protect all matched routes and redirect unauthenticated users
// to the login page defined in your NextAuth configuration.
export { default } from "next-auth/middleware";

// Protect all routes EXCEPT the ones required for authentication (api/auth),
// the login page itself, and static assets.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - login (the login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (the favicon file)
     */
    "/((?!api/auth|login|_next/static|_next/image|favicon.ico).*)",
  ],
};