import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import BaseLayout from "@/components/layout/BaseLayout";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <BaseLayout>{children}</BaseLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
