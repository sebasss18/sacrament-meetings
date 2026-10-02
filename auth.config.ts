import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const pathname = nextUrl.pathname;
      const isProtected =
        pathname === "/meetings/new" ||
        /^\/meetings\/\d+\/edit$/.test(pathname);

      if (isProtected && !isLoggedIn) {
        return false;
      }

      if (isLoggedIn && pathname === "/login") {
        return Response.redirect(new URL("/meetings", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
