import type { NextAuthConfig } from "next-auth";
import { isAdminEmail } from "@/lib/auth-utils";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAdmin = isAdminEmail(auth?.user?.email);
      const pathname = nextUrl.pathname;
      const isMeetingsPage =
        pathname === "/meetings" || pathname.startsWith("/meetings/");

      if (isMeetingsPage && !isAdmin) {
        return false;
      }

      if (isAdmin && pathname === "/login") {
        return Response.redirect(new URL("/meetings", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
