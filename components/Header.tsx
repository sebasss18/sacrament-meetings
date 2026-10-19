import NavLinks from "./NavLinks";
import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";
import HeaderScroll from "./HeaderScroll";
import WardName from "./WardName";

async function AuthControls() {
  const session = await auth();

  return session?.user ? (
    <SignOutButton />
  ) : (
    <Link
      href="/login"
      className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/30 active:scale-100"
    >
      Iniciar sesión
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export default function Header() {
  const date = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <HeaderScroll>
      <Link href="/" className="leading-tight">
        <WardName />

        <p className="flex items-center gap-2 text-sm capitalize text-white/60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
          </span>
          {date}
        </p>
      </Link>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <NavLinks />
        <AuthControls />
      </div>
    </HeaderScroll>
  );
}
