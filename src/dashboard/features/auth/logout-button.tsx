"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const handleLogout = () => {
    // Redirects to the login page after signing out.
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="text-sm text-red-500 hover:bg-destructive/10 hover:text-red-600 ml-auto"
    >
      Logout
    </Button>
  );
}