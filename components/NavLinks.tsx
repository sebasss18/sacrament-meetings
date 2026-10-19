"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/meetings", label: "Reuniones" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const transition = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 380, damping: 32 } as const);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <nav aria-label="Principal">
      <ul className="flex gap-2">
        {links.map(({ href, label }) => {
          const active = isActive(href);

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group relative block rounded-sm px-3 py-1.5 text-sm outline-none transition-[color,text-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-sky-300/60 ${
                  active
                    ? "font-medium text-white"
                    : "text-white/60 hover:text-white hover:[text-shadow:0_0_14px_rgba(125,211,252,0.55)] focus-visible:text-white focus-visible:[text-shadow:0_0_14px_rgba(125,211,252,0.55)] motion-reduce:transition-none"
                }`}
              >
                
                {!active && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-3 -inset-y-2 scale-50 bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.35),transparent_70%)] opacity-0 blur-md transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:scale-100 motion-reduce:transition-none"
                  />
                )}

                <span className="relative">{label}</span>

                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    aria-hidden="true"
                    transition={transition}
                    className="absolute -bottom-2.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-sky-300 shadow-[0_0_6px_rgba(125,211,252,0.6)]"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
