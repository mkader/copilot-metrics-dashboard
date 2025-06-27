"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the cookie by setting Max-Age to 0
    document.cookie = "auth=; Max-Age=0; path=/";
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:underline ml-auto"
    >
      Logout
    </button>
  );
}
