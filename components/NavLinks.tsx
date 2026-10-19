"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const base =
  "relative block rounded-full px-3 py-1.5 text-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:text-white after:absolute after:left-1/2 after:-bottom-2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-sky-300 after:transition-all after:duration-300";

export default function NavLinks() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMeetings = pathname.startsWith("/meetings");

  const style = (active: boolean) =>
    `${base} ${
      active
        ? "font-medium text-white after:scale-100 after:opacity-100"
        : "text-white/70 after:scale-0 after:opacity-0"
    }`;

  return (
    <nav>
      <ul className="flex gap-1">
        <li>
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className={style(isHome)}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            href="/meetings"
            aria-current={isMeetings ? "page" : undefined}
            className={style(isMeetings)}
          >
            Reuniones
          </Link>
        </li>
      </ul>
    </nav>
  );
}
