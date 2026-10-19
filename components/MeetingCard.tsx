import Link from "next/link";
import type { SacramentMeeting } from "../lib/types";
import { meetingTypeLabels } from "../lib/labels";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div>
      <Link
        href={`/meetings/${meeting.id}`}
        className="block rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-md transition duration-300 hover:scale-102 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <h2 className="text-xl font-bold">
          {new Date(`${meeting.date}T00:00:00`).toLocaleDateString("es-MX", {
            dateStyle: "long",
          })}
        </h2>
        <p className="mt-2">{meetingTypeLabels[meeting.meetingType]}</p>
        <p className="mt-2">Preside: {meeting.presiding}</p>
        <p>Dirige: {meeting.conducting}</p>
      </Link>
    </div>
  );
}
