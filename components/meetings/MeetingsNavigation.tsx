"use client";

import { useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";

interface MeetingsNavigationProps {
  isAuthenticated: boolean;
}

export default function MeetingsNavigation({
  isAuthenticated,
}: MeetingsNavigationProps) {
  const pathname = usePathname();
  const groupId = useId();
  const reduceMotion = useReducedMotion();

  if (!pathname.startsWith("/meetings")) {
    return null;
  }

  const tabs = [
    {
      href: "/meetings",
      label: "Reuniones",
      active: pathname === "/meetings",
    },
    {
      href: "/meetings/current",
      label: "Reunión actual",
      active: pathname === "/meetings/current",
    },
  ];

  const isCreateActive = pathname === "/meetings/new";

  // Resorte compartido solo entre las pestañas.
  const slide = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 420, damping: 36, mass: 0.8 } as const);

  const fade = { duration: reduceMotion ? 0 : 0.15 };

  return (
    <nav
      aria-label="Navegación de reuniones"
      className="mb-8 flex items-end justify-between gap-3 border-b border-slate-200"
    >
      {/* Pestañas: comparten indicador deslizante */}
      <LayoutGroup id={groupId}>
        <ul className="flex min-w-0 flex-1 gap-1 sm:flex-none sm:gap-2">
          {tabs.map((tab) => (
            <li key={tab.href} className="flex min-w-0 flex-1 sm:flex-none">
              <Link
                href={tab.href}
                aria-current={tab.active ? "page" : undefined}
                className={`group relative isolate flex min-h-12 w-full min-w-0 items-center justify-center rounded-t-xl px-2 py-3 text-center text-xs font-medium outline-none transition-colors duration-200 sm:px-5 sm:text-sm focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ${
                  tab.active
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {/* Fondo de hover: solo en pestañas inactivas */}
                {!tab.active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0.5 inset-y-1 -z-20 rounded-lg bg-slate-100 opacity-0 transition-opacity duration-200 group-hover:opacity-70"
                  />
                )}

                <AnimatePresence initial={false}>
                  {tab.active && (
                    <motion.span
                      key="pill"
                      layoutId="meetings-nav-pill"
                      transition={slide}
                      exit={{ opacity: 0, transition: fade }}
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-t-xl bg-gradient-to-b from-slate-100 to-slate-50"
                    />
                  )}
                </AnimatePresence>

                <motion.span
                  className="relative"
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {tab.label}
                </motion.span>

                <AnimatePresence initial={false}>
                  {tab.active && (
                    <motion.span
                      key="underline"
                      layoutId="meetings-nav-underline"
                      transition={slide}
                      exit={{ opacity: 0, transition: fade }}
                      aria-hidden="true"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-slate-800 sm:inset-x-4"
                    />
                  )}
                </AnimatePresence>

                {/* Pista de hover en pestañas inactivas */}
                {!tab.active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-px h-0.5 origin-center scale-x-0 rounded-full bg-slate-300 transition-transform duration-300 ease-out group-hover:scale-x-100 sm:inset-x-4"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </LayoutGroup>

      {/* Acción separada: botón independiente, fuera del grupo de pestañas */}
      {isAuthenticated && (
        <motion.div
          className="mb-2 shrink-0"
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Link
            href="/meetings/new"
            aria-label="Crear reunión"
            aria-current={isCreateActive ? "page" : undefined}
            className={`group inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium text-white shadow-sm outline-none transition-all duration-200 sm:gap-2 sm:px-4 sm:text-sm focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ${
              isCreateActive
                ? "bg-slate-700 ring-1 ring-slate-900/20"
                : "bg-slate-900 hover:-translate-y-px hover:bg-slate-800 hover:shadow-md"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3.5 transition-transform duration-300 ease-out group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <path d="M8 3v10M3 8h10" />
            </svg>
            <span className="sm:hidden">Crear</span>
            <span className="hidden sm:inline">Crear reunión</span>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
