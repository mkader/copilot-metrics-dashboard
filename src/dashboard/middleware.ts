import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Use the 'value' of the App Role you defined in the Azure manifest.
// This is a string, NOT an Object ID.
const READ_ROLE_VALUE = process.env.AZURE_AD_APP_Role; 

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    const { token } = request.nextauth;
    const userRoles = token?.roles as string[] | undefined;

    // Check if the user's roles array includes the required role value.
    const isAuthorized = userRoles?.includes(READ_ROLE_VALUE ?? "") ?? false;

    console.log("User Roles:", token);

    // If the user is not authorized, redirect them to an unauthorized page
    if (!isAuthorized) {
      return NextResponse.rewrite(new URL("/unauthorized", request.url));
    }

    // If authorized, continue to the requested page
    return NextResponse.next();
  },
  {
    callbacks: {
      // This ensures the middleware itself only runs if the user is logged in.
      authorized: ({ token }) => !!token,
    },
  }
);

// This config remains the same, protecting your app routes.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - login (the login page)
     * - Denined Access (the unauthorized page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (the favicon file)
     */
    "/((?!api/auth|login|unauthorized|_next/static|_next/image|favicon.ico).*)"],
};