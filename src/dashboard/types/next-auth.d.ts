// src/dashboard/types/next-auth.d.ts

import { DefaultSession } from "next-auth";
import "next-auth/jwt";

/**
 * We are augmenting the default types from next-auth to include properties
 * that are specific to our application and authentication provider (Azure AD).
 */

declare module "next-auth" {
  /**
   * The `Profile` interface is augmented to include the `oid` (Object ID)
   * which is returned by the Azure AD provider.
   */
  interface Profile {
    oid?: string;
  }

  /**
   * The `Session` interface is what's returned by `useSession()` or `getSession()`.
   * We add the user's unique ID (`id`) and the OAuth access token.
   */
  interface Session {
    accessToken?: string;
    user: {
      /** The user's object ID from Azure AD. */
      id: string;
    } & DefaultSession["user"]; // This keeps the default properties like `name`, `email`, `image`
  }
}

declare module "next-auth/jwt" {
  /**
   * The `JWT` interface is the shape of the token that is passed between the `jwt`
   * and `session` callbacks. We add the `oid` and `accessToken` here so we can
   * pass them from the JWT to the session object.
   */
  interface JWT {
    oid?: string;
    accessToken?: string;
  }
}