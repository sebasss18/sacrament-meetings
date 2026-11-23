// Site header and administrator actions.
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import NavLinks from "./NavLinks";
import SignOutButton from "../login/SignOutButton";
import HeaderScroll from "./HeaderScroll";
import WardName from "../ward/WardName";

async function AuthControls() {
  const session = await auth();

  return session?.user ? (
    <div className="flex items-center gap-2">
      {session.user.isAdmin && (
        <Link
          href="/account"
          className="inline-flex h-9 items-center rounded-full border border-white/15 px-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:h-10 sm:px-4"
        >
          Mi cuenta
        </Link>
      )}
      <SignOutButton />
    </div>
  ) : (
    <Link
      href="/login"
      className="group inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-4 text-sm font-medium text-white outline-none transition-colors duration-200 hover:bg-white hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-white/60 sm:h-10 sm:gap-2 sm:px-5"
    >
      Iniciar sesión
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </Link>
  );
}

export default function Header() {
  const date = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <HeaderScroll>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 transition-[row-gap] duration-300 group-data-[compact=true]/header:gap-y-2 sm:grid-cols-[auto_1fr_auto] sm:gap-x-8">
        <Link
          href="/"
          className="col-start-1 row-start-1 flex min-w-0 items-center gap-3 outline-none"
        >
          <Image
            src="/iglesiadejesucristo-logo.png"
            alt="La Iglesia de Jesucristo de los Santos de los Últimos Días"
            width={96}
            height={96}
            priority
            className="size-10 shrink-0 transition-[width,height] duration-300 ease-out group-data-[compact=true]/header:size-8 motion-reduce:transition-none sm:size-12 sm:group-data-[compact=true]/header:size-9"
          />

          <span className="flex min-w-0 flex-col leading-tight [&_h1]:truncate [&_h1]:text-sm [&_h1]:font-semibold [&_h1]:leading-tight sm:[&_h1]:text-base">
            <WardName />
            <span className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-300 ease-out group-data-[compact=true]/header:grid-rows-[0fr] group-data-[compact=true]/header:opacity-0 motion-reduce:transition-none">
              <span className="min-h-0 overflow-hidden truncate text-[11px] capitalize text-white/55 sm:text-xs">
                {date}
              </span>
            </span>
          </span>
        </Link>

        <div className="col-start-2 row-start-1 shrink-0 sm:col-start-3">
          <AuthControls />
        </div>

        <div className="col-span-2 row-start-2 flex justify-center border-t border-white/10 pt-3 transition-[padding] duration-300 group-data-[compact=true]/header:pt-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:border-0 sm:pt-0 sm:group-data-[compact=true]/header:pt-0">
          <NavLinks />
        </div>
      </div>
    </HeaderScroll>
  );
}
