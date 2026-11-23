// Auth.js callbacks and route authorization.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.isAdmin = user.isAdmin === true;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.isAdmin = token.isAdmin === true;
      }

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isAdmin = auth?.user?.isAdmin === true;
      const pathname = nextUrl.pathname;
      const isMeetingsPage =
        pathname === "/meetings" || pathname.startsWith("/meetings/");
      const isAccountPage = pathname === "/account";

      if ((isMeetingsPage || isAccountPage) && !isAdmin) {
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
