"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-8">
      <input
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search meetings"
        className="w-full px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base border-2 md:border-3 border-slate-700 rounded-full bg-white transition-all duration-300 ease-out focus:outline-none focus:shadow-lg focus:shadow-slate-800/20 hover:border-slate-700 placeholder:text-slate-400 mt-4"
      />
    </div>
  );
}
