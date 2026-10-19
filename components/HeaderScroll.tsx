"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function HeaderScroll({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;

      setCompact((current) => {
        if (!current && scrollY > 24) return true;
        if (current && scrollY < 12) return false;
        return current;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-2 z-50 mx-2 mt-2 mb-2 flex flex-col gap-5 rounded-xl border border-white/15 text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-all duration-500 ease-in-out hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)] sm:flex-row sm:items-center sm:justify-between ${
        compact
          ? "relative gap-4 overflow-hidden border-white/20 bg-slate-800/80 p-4 backdrop-blur-[2px] sm:p-4 before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:border before:border-white/10 before:content-['']"
          : "bg-slate-800 p-5 sm:p-6"
      }`}
    >
      {children}
    </header>
  );
}
