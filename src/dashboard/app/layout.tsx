// src/dashboard/app/layout.tsx

import { AppHeader } from "@/features/app-header/app-header";
import { ThemeProvider } from "@/features/common/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/features/auth/auth-provider";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // <-- UPDATE the import path

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub Copilot Metrics Dashboard",
  description: "GitHub Copilot Metrics Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <AuthProvider>
          <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen w-full flex-col bg-muted-foreground/5">
              {!!session && <AppHeader />}
              {children}
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}