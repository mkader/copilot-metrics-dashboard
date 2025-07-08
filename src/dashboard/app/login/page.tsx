"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is already authenticated, redirect them to the homepage.
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show a loading state while session is being checked
  if (status === "loading") {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </main>
    );
  }

  // Only show login button if not authenticated
  if (status === "unauthenticated") {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-background">
        <div className="space-y-6 bg-white dark:bg-muted p-8 rounded shadow text-center w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Copilot Metrics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please sign in with your Microsoft account to continue.
          </p>
          <Button
            onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
            className="w-full bg-black text-white dark:bg-white dark:text-black"
          >
            Sign in with Microsoft
          </Button>
        </div>
      </main>
    );
  }

  // This will be shown briefly during the redirect after authentication
  return null;
}