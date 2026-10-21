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

  const travel = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 300, damping: 34 } as const);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav aria-label="Principal">
      <ul className="flex gap-10 pl-5">
        {links.map(({ href, label }) => {
          const active = isActive(href);

          return (
            <li key={href} className="relative">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group block py-1 text-[0.9375rem] font-light tracking-[0.01em] outline-none transition-colors duration-500 motion-reduce:transition-none focus-visible:text-white ${
                  active ? "text-white" : "text-white/45 hover:text-white/85"
                }`}
              >
                {!active && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-5 top-1/2 size-1 -translate-y-1/2 scale-0 rounded-full bg-white/30 transition-transform duration-500 ease-out group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none"
                  />
                )}

                {label}
              </Link>

              {active && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-5 inset-y-0 flex items-center"
                >
                  <motion.span
                    layoutId="nav-dot"
                    transition={travel}
                    className="relative block size-1"
                  >
                    {/* Latido del punto */}
                    <motion.span
                      className="absolute inset-0 rounded-full bg-white"
                      animate={
                        reduceMotion
                          ? undefined
                          : { scale: [1, 1.9, 1, 1.5, 1] }
                      }
                      transition={{
                        duration: 1.1,
                        delay: 0.25,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.45, 0.65, 1],
                      }}
                    />

                    {/* Anillo que se expande al llegar */}
                    {!reduceMotion && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-white"
                        initial={{ scale: 1, opacity: 0.45 }}
                        animate={{ scale: 5, opacity: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    )}
                  </motion.span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
