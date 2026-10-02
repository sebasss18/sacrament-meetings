"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MeetingsNavigationProps {
  isAuthenticated: boolean;
}

export default function MeetingsNavigation({
  isAuthenticated,
}: MeetingsNavigationProps) {
  const pathname = usePathname();
  const isAllMeetings = pathname === "/meetings";
  const isCurrentMeeting = pathname === "/meetings/current";
  const isCreateMeeting = pathname === "/meetings/new";

  return (
    <nav className="mb-6 flex gap-6 border-b pb-4">
      <Link
        href="/meetings"
        aria-current={isAllMeetings ? "page" : undefined}
        className={`transition-all duration-300 ${isAllMeetings ? "font-bold" : ""}`}
      >
        All Meetings
      </Link>
      <Link
        href="/meetings/current"
        aria-current={isCurrentMeeting ? "page" : undefined}
        className={`transition-all duration-300 ${isCurrentMeeting ? "font-bold" : ""}`}
      >
        Current Meeting
      </Link>
      {isAuthenticated && (
        <Link
          href="/meetings/new"
          aria-current={isCreateMeeting ? "page" : undefined}
          className={`transition-all duration-300 ${isCreateMeeting ? "font-bold" : ""}`}
        >
          Create Meeting
        </Link>
      )}
    </nav>
  );
}
