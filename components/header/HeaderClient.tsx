"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import SignOutButton from "../login/SignOutButton";

type HeaderClientProps = {
  isLoggedIn: boolean;
};

export default function HeaderClient({ isLoggedIn }: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const date = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header
      className={`sticky top-0 z-50 flex flex-col gap-5 border border-white/15 bg-slate-800 p-5 text-white backdrop-blur-xl transition-all duration-500 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
        scrolled
          ? "mx-0 mt-0 mb-2 rounded-none shadow-[0_8px_20px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.12)]"
          : "mx-2 mt-2 mb-2 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.08)]"
      }`}
    >
      <Link href="/" className="leading-tight">
        <h1 className="text-2xl font-bold tracking-tight">Rio Sonora</h1>

        <p className="flex items-center gap-2 text-sm capitalize text-white/60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
          </span>
          {date}
        </p>
      </Link>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <NavLinks />
        {isLoggedIn ? (
          <SignOutButton />
        ) : (
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/30 active:scale-100"
          >
            Iniciar sesión
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
