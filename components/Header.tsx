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
      className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/30 active:scale-100"
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
      <Link
        href="/"
        className="min-w-0 leading-tight max-sm:[&_h1]:[font-size:calc(24px_-_8px*var(--p))] max-sm:[&_h1]:[line-height:calc(32px_-_8px*var(--p))]"
      >
        <div className="flex items-center justify-between gap-2">
          <WardName />

          <span
            aria-hidden="true"
            className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-[11px] capitalize text-white/60 [max-width:calc(11rem*var(--p))] [opacity:var(--p)] [transform:translateX(calc(16px*(1_-_var(--p))))] sm:hidden"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
            {date}
          </span>
        </div>

        <div className="max-sm:overflow-hidden max-sm:[height:calc(20px*(1_-_var(--p)))] max-sm:[opacity:calc(1_-_var(--p))]">
          <p className="flex items-center gap-2 text-sm capitalize text-white/60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
            </span>
            {date}
          </p>
        </div>
      </Link>

      <div className="flex flex-row items-center justify-between gap-2 sm:justify-end sm:gap-4 max-sm:[&>a]:[font-size:calc(14px_-_2px*var(--p))] max-sm:[&>a]:[line-height:calc(20px_-_4px*var(--p))] max-sm:[&>a]:[padding:calc(8px_-_4px*var(--p))_calc(16px_-_6px*var(--p))] max-sm:[&_button]:[font-size:calc(14px_-_2px*var(--p))] max-sm:[&_button]:[line-height:calc(20px_-_4px*var(--p))] max-sm:[&_button]:[padding:calc(8px_-_4px*var(--p))_calc(16px_-_4px*var(--p))] max-sm:[&_nav_a]:[font-size:calc(14px_-_2px*var(--p))] max-sm:[&_nav_a]:[line-height:calc(20px_-_4px*var(--p))] max-sm:[&_nav_a]:[padding:calc(6px_-_2px*var(--p))_calc(12px_-_2px*var(--p))]">
        <NavLinks />
        <AuthControls />
      </div>
    </HeaderScroll>
  );
}
