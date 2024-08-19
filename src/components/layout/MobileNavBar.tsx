"use cliet";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import BrandLink from "./BrandLink";
import { NavLinks, NonUserLinks } from "@/lib/constants";
import { useAuth } from "../auth/AuthProvider";
import Link from "next/link";

const MobileNavBar = () => {
  const auth = useAuth();
  return (
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
                key={`nav-links-b-${idx}`}
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
                    key={`nav-links-c-${idx}`}
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
  );
};

export default MobileNavBar;
