"use client";
import Link from "next/link";
import { useAuth } from "../auth/AuthProvider";
import BrandLink from "./BrandLink";
import { NavLinks, NonUserLinks } from "@/lib/constants";
import { ModeToggle } from "../ModeToggle";
import MobileNavBar from "./MobileNavBar";
import AccountDropDown from "./AccountDropDown";

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
              key={`nav-links-a-${idx}`}
              href={navLinkItem.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {navLinkItem.label}
            </Link>
          );
        })}
      </nav>
      <MobileNavBar />
      <div className="md:hidden">
        <BrandLink displayName={true} />
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {auth.isAuthenticated ? (
          <AccountDropDown />
        ) : (
          <div className="ml-auto space-x-2">
            {NonUserLinks.map((navLinkItem, idx) => {
              const shouldHide =
                auth.isAuthenticated && !navLinkItem.authRequired;
              return shouldHide ? null : (
                <Link
                  key={`nav-links-d-${idx}`}
                  href={navLinkItem.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {navLinkItem.label}
                </Link>
              );
            })}
          </div>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default NavBar;
