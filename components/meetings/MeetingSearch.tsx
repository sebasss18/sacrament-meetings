"use client";

import { useState, useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("query") ?? "");

  const applySearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const handleChange = (term: string) => {
    setValue(term);
    applySearch(term);
  };

  const handleClear = () => {
    setValue("");
    applySearch.cancel();
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("query");
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div role="search" className="group relative mt-4 mb-8">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:text-slate-900"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <input
        type="text"
        inputMode="search"
        autoComplete="off"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Busca por discursante, líder o tipo de reunión..."
        aria-label="Buscar reuniones"
        className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-12 pl-12 text-sm text-slate-900 shadow-sm outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-900 focus:shadow-lg focus:shadow-slate-900/10 focus-visible:ring-2 focus-visible:ring-slate-900/20 md:text-base"
      />

      <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
        <span
          aria-hidden="true"
          className={`h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)] transition-opacity duration-300 ${
            isPending ? "animate-pulse opacity-100" : "opacity-0"
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className="flex size-7 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900/30 focus-visible:outline-none"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-4"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
