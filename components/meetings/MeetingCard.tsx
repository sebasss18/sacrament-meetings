import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { meetingTypeLabels } from "@/lib/labels";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const date = new Date(`${meeting.date}T00:00:00`);

  const weekday = date.toLocaleDateString("es-MX", { weekday: "long" });
  const fullDate = date.toLocaleDateString("es-MX", { dateStyle: "long" });

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-md outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-102 hover:border-slate-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-slate-900/30 motion-reduce:transform-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-slate-600 dark:focus-visible:ring-white/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            {weekday}
          </p>
          <h2 className="mt-1 text-xl leading-tight font-bold">{fullDate}</h2>
        </div>

        <span
          aria-hidden="true"
          className="text-xl text-slate-400 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-slate-900 dark:group-hover:text-white"
        >
          →
        </span>
      </div>

      <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        {meetingTypeLabels[meeting.meetingType]}
      </span>

      <dl className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-700">
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-slate-500 dark:text-slate-400">
            Preside
          </dt>
          <dd className="font-medium">{meeting.presiding}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-slate-500 dark:text-slate-400">
            Dirige
          </dt>
          <dd className="font-medium">{meeting.conducting}</dd>
        </div>
      </dl>
    </Link>
  );
}
