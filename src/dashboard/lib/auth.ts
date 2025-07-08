// src/dashboard/lib/auth.ts

import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.oid = profile.oid;
      }
      return token;
    },
    async session({ session, token }) {
      // The type for session.user is extended in a types file
      // for better autocompletion and type safety.
      if (session.user) {
        session.user.id = token.oid as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  // You must specify a custom login page or next-auth will use its default.
  pages: {
    signIn: '/login',
  }
};