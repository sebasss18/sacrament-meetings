"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col p-6">
      {children}
    </main>
  );
}
