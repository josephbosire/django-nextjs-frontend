"use client";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "../auth/AuthProvider";
import BrandLink from "./BrandLink";
import { NavLinks, NonUserLinks } from "@/lib/constants";

const NavBar = () => {
  const auth = useAuth();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <BrandLink displayName={true} />
        {NavLinks.map((navLinkItem, idx) => {
          const shouldHide = !auth.isAuthenticated && navLinkItem.authRequired;
          return shouldHide ? null : (
            <Link
              href={navLinkItem.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {navLinkItem.label}
            </Link>
          );
        })}
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
            <BrandLink />
            {NavLinks.map((navLinkItem, idx) => {
              const shouldHide =
                !auth.isAuthenticated && navLinkItem.authRequired;
              return shouldHide ? null : (
                <Link
                  href={navLinkItem.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {navLinkItem.label}
                </Link>
              );
            })}
            {auth.isAuthenticated ? (
              <Link
                href="/logout"
                className="text-muted-foreground hover:text-foreground"
              >
                Logout
              </Link>
            ) : (
              <>
                {NonUserLinks.map((navLinkItem, idx) => {
                  const shouldHide =
                    auth.isAuthenticated && !navLinkItem.authRequired;
                  return shouldHide ? null : (
                    <Link
                      href={navLinkItem.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {navLinkItem.label}
                    </Link>
                  );
                })}
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="md:hidden">
        <BrandLink displayName={true} />
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {auth.isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="ml-auto space-x-2">
            {NonUserLinks.map((navLinkItem, idx) => {
              const shouldHide =
                auth.isAuthenticated && !navLinkItem.authRequired;
              return shouldHide ? null : (
                <Link
                  href={navLinkItem.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {navLinkItem.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
