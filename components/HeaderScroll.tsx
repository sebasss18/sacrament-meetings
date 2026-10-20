"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const OPEN_COMPACT_AT = 60;
const CLOSE_COMPACT_AT = 10;
const ANIMATION_MS = 550;
const SETTLE_MS = 300;

function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function soft(t: number) {
  return t * t * t * (t * (6 * t - 15) + 10);
}

export default function HeaderScroll({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);
  const [fullHeight, setFullHeight] = useState<number | undefined>();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;

      setCompact((current) => {
        if (!current && scrollY > OPEN_COMPACT_AT) return true;
        if (current && scrollY < CLOSE_COMPACT_AT) return false;
        return current;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const target = compact ? 1 : 0;
    const from = progressRef.current;
    if (from === target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? 0 : ANIMATION_MS * Math.abs(target - from);
    const start = performance.now();
    let frame = 0;

    function step(now: number) {
      const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const value = from + (target - from) * ease(t);

      progressRef.current = value;
      header!.style.setProperty("--p", value.toFixed(4));
      header!.style.setProperty(
        "--d",
        (from + (target - from) * soft(t)).toFixed(4),
      );

      if (t < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [compact]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    setFullHeight(header.offsetHeight);

    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new ResizeObserver(() => {
      if (timer) clearTimeout(timer);

      if (progressRef.current > 0.001) return;

      timer = setTimeout(() => {
        if (progressRef.current <= 0.001) {
          setFullHeight(header.offsetHeight);
        }
      }, SETTLE_MS);
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
        className="pointer-events-auto relative mx-0 mt-0 mb-0 flex flex-col overflow-hidden rounded-none text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] backdrop-blur-[2px] transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)] [--p:0] [--d:0] [background-color:rgb(2_6_23_/_calc(1_-_0.3*var(--p)))] [gap:calc(20px_-_14px*var(--p))] [padding:calc(20px_-_12px*var(--p))_calc(20px_-_4px*var(--p))_calc(20px_+_4px*var(--p))] sm:flex-row sm:items-center sm:justify-between sm:[gap:calc(20px_-_4px*var(--p))] sm:[padding:calc(24px_-_8px*var(--p))]"
      >
        {children}
      </header>
    </div>
  );
}
