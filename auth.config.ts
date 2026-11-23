// Auth.js session callbacks and private-route authorization.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = Boolean(auth?.user?.id);
      const pathname = nextUrl.pathname;
      const isMeetingsPage =
        pathname === "/meetings" || pathname.startsWith("/meetings/");
      const isAccountPage = pathname === "/account";

      if ((isMeetingsPage || isAccountPage) && !isAuthenticated) {
        return false;
      }

      if (isAuthenticated && pathname === "/login") {
        return Response.redirect(new URL("/meetings", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
