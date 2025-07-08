import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // <-- IMPORT from the new file

// DO NOT export authOptions from this file anymore.

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };