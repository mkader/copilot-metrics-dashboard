"use client";

import { LayoutDashboard, Menu, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getFeatures } from "@/utils/helpers";
import { LogoutButton } from "@/features/auth/logout-button";
import { MainNavItem } from "./main-nav-item";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CompanyLogo = () => {
  return (
    <MainNavItem path="/">
      <Image
        src="/copilot.png"
        width={32}
        height={32}
        alt="GitHub Copilot Dashboard"
      />
    </MainNavItem>
  );
};

const MenuItems = () => {
  const features = getFeatures();

  return (
    <>
      <MainNavItem path="/">
        <LayoutDashboard size={18} strokeWidth={1.4} />
        Dashboard
      </MainNavItem>
      {features.seats && (
        <MainNavItem path="/seats">
          <Users size={18} strokeWidth={1.4} />
          Seats
        </MainNavItem>
      )}
    </>
  );
};

const UserProfile = () => {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {session.user.image ? (
            <Image
              src={session.user.image}
              width={32}
              height={32}
              alt={session.user.name ?? "User avatar"}
              className="rounded-full"
            />
          ) : (
            <span>{session.user.name?.charAt(0).toUpperCase()}</span>
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
           <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <CompanyLogo />
        <MenuItems />
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <CompanyLogo />
            <MenuItems />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <ThemeToggle />
        <UserProfile />
      </div>
    </header>
  );
};