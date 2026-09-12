"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMeetings = pathname.startsWith("/meetings");

  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className={`transition-all duration-300 hover:scale-105 ${
              isHome ? "font-bold" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/meetings"
            aria-current={isMeetings ? "page" : undefined}
            className={`transition-all duration-300 hover:scale-105 ${
              isMeetings ? "font-bold" : ""
            }`}
          >
            Meetings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
