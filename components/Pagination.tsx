"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="flex gap-4 justify-center mt-8">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 hover:scale-105 transition-all duration-300"
        >
          Previous
        </Link>
      ) : (
        <span className="px-6 py-2 bg-gray-400 text-gray-600 rounded-full cursor-not-allowed">
          Previous
        </span>
      )}
      <span className="px-2 py-2 text-slate-800">
        {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 hover:scale-105 transition-all duration-300"
        >
          Next
        </Link>
      ) : (
        <span className="px-6 py-2 bg-gray-400 text-gray-600 rounded-full cursor-not-allowed">
          Next
        </span>
      )}
    </nav>
  );
}
