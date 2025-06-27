"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "@/features/app-header/app-header";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted-foreground/5">
      {!isLoginPage && <AppHeader />}
      {children}
    </div>
  );
}
