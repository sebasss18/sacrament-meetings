"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAllMeetings = pathname === "/meetings";
  const isCurrentMeeting = pathname === "/meetings/current";
  const isCreateMeeting = pathname === "/meetings/new";

  return (
    <section>
      <nav className="mb-6 flex gap-6 border-b pb-4">
        <Link
          href="/meetings"
          aria-current={isAllMeetings ? "page" : undefined}
          className={`transition-all duration-300 hover:scale-105 ${
            isAllMeetings ? "font-bold" : ""
          }`}
        >
          All Meetings
        </Link>
        <Link
          href="/meetings/current"
          aria-current={isCurrentMeeting ? "page" : undefined}
          className={`transition-all duration-300 hover:scale-105 ${
            isCurrentMeeting ? "font-bold" : ""
          }`}
        >
          Current Meeting
        </Link>
        <Link
          href="/meetings/new"
          aria-current={isCreateMeeting ? "page" : undefined}
          className={`transition-all duration-300 hover:scale-105 ${
            isCreateMeeting ? "font-bold" : ""
          }`}
        >
          Create Meeting
        </Link>
      </nav>
      {children}
    </section>
  );
}
