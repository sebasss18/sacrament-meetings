"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 10);
      setProgress(max > 0 ? Math.min((y / max) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const date = now
    ? now.toLocaleDateString("es-MX", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : "";
  const time = now
    ? now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 ${
        scrolled
          ? "bg-[#2f3f50]/85 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-[#2f3f50]"
      }`}
    >
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={`flex items-center justify-center rounded-full bg-white/10 font-semibold ring-1 ring-white/20 transition-all duration-300 group-hover:rotate-12 group-hover:bg-sky-300 group-hover:text-slate-900 group-hover:ring-sky-300 ${
              scrolled ? "h-8 w-8 text-sm" : "h-10 w-10"
            }`}
          >
            R
          </span>
          <div className="leading-tight">
            <h1
              className={`font-semibold tracking-tight transition-all duration-300 ${
                scrolled ? "text-base" : "text-lg"
              }`}
            >
              Rio Sonora
            </h1>
            <p
              className={`flex items-center gap-1.5 text-xs text-white/60 transition-all duration-300 ${
                scrolled ? "hidden" : "hidden sm:flex"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
              </span>
              <span className="capitalize">{date}</span>
              <span>·</span>
              <span>{time}</span>
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">{children}</div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
        <div
          className="h-full bg-sky-300 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
