import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Profile {
    oid?: string;
    // Add the roles property from the Azure AD token
    roles?: string[];
  }

  interface Session {
    accessToken?: string;
    user: {
      id: string;
      // Add roles to the session user object
      roles?: string[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    oid?: string;
    accessToken?: string;
    // Add roles to the JWT token
    roles?: string[];
  }
}