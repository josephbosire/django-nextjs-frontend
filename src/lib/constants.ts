export const NavLinks = [
  {
    label: "Dashboard",
    authRequired: true,
    href: "/",
  },
  {
    label: "Waitlist",
    authRequired: true,
    href: "/waitlists",
  },
];

export const NonUserLinks = [
  {
    label: "Sign Up",
    authRequired: false,
    href: "/signup",
  },
  {
    label: "Login",
    authRequired: false,
    href: "/login",
  },
];
