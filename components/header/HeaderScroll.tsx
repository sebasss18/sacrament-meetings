"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const OPEN_COMPACT_AT = 60;
const CLOSE_COMPACT_AT = 10;
const SETTLE_MS = 400;

export default function HeaderScroll({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);
  const [fullHeight, setFullHeight] = useState<number | undefined>();
  const headerRef = useRef<HTMLElement>(null);
  const compactRef = useRef(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const current = compactRef.current;

      if (!current && scrollY > OPEN_COMPACT_AT) {
        compactRef.current = true;
        setCompact(true);
      } else if (current && scrollY < CLOSE_COMPACT_AT) {
        compactRef.current = false;
        setCompact(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    function measure() {
      if (compactRef.current || !header) return;
      setFullHeight(header.offsetHeight);
    }

    measure();

    const observer = new ResizeObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(measure, SETTLE_MS);
    });

    observer.observe(header);

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      style={{ height: fullHeight }}
      className="pointer-events-none sticky top-0 z-50"
    >
      <header
        ref={headerRef}
        data-compact={compact}
        className="group/header pointer-events-auto relative overflow-hidden border-b border-white/10 bg-slate-950 px-4 py-2.5 text-white transition-[padding,background-color,box-shadow] duration-300 ease-out data-[compact=true]:bg-slate-950/85 data-[compact=true]:py-1.5 data-[compact=true]:shadow-[0_8px_24px_rgba(0,0,0,0.3)] data-[compact=true]:backdrop-blur-md motion-reduce:transition-none sm:px-6 sm:py-3 sm:data-[compact=true]:py-2"
      >
        {children}
      </header>
    </div>
  );
}
