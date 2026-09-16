import Link from "next/link";
import type { SacramentMeeting } from "../lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-md transition duration-300 hover:scale-102 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    >
      <h2 className="text-xl font-bold">{meeting.date}</h2>
      <p className="mt-2 capitalize">{meeting.meetingType} Meeting</p>
      <p className="mt-2">Presiding: {meeting.presiding}</p>
      <p>Conducting: {meeting.conducting}</p>
    </Link>
  );
}