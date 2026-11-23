"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/meetings", label: "Reuniones" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const prevLeft = useRef<number | null>(null);

  const [pos, setPos] = useState<{ left: number; right: number } | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname],
  );

  const measure = useCallback(() => {
    const ul = listRef.current;
    const idx = links.findIndex((l) => isActive(l.href));
    const el = idx >= 0 ? itemRefs.current[idx] : null;

    if (!ul || !el) {
      setPos(null);
      prevLeft.current = null;
      return;
    }

    const left = el.offsetLeft;
    const right = ul.clientWidth - (left + el.offsetWidth);

    if (prevLeft.current !== null && prevLeft.current !== left) {
      setDir(left > prevLeft.current ? 1 : -1);
    }
    prevLeft.current = left;
    setPos({ left, right });
  }, [isActive]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // El borde que va adelante sale rápido y el de atrás lo persigue:
  // la cápsula se estira cubriendo ambos links y luego se ajusta al destino.
  const lead = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 480, damping: 38, mass: 0.7 } as const);
  const trail = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 210, damping: 30, mass: 0.9 } as const);

  return (
    <nav aria-label="Principal">
      <ul ref={listRef} className="relative flex items-center gap-1">
        {/* Cápsula blanca sólida detrás del texto activo */}
        {pos && (
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ left: pos.left, right: pos.right }}
            transition={{
              left: dir === 1 ? trail : lead,
              right: dir === 1 ? lead : trail,
            }}
            className="pointer-events-none absolute inset-y-0 rounded-full bg-white shadow-[0_4px_20px_-6px_rgba(255,255,255,0.35)]"
          />
        )}

        {links.map(({ href, label }, i) => {
          const active = isActive(href);

          return (
            <li
              key={href}
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
              className="relative"
            >
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative block rounded-full px-5 py-2 text-[0.9375rem] tracking-[0.01em] outline-none transition-colors motion-reduce:transition-none focus-visible:ring-1 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  active
                    ? "font-medium text-neutral-950 duration-300 delay-100"
                    : "font-light text-white/55 duration-200 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
