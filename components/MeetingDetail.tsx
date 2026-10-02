import type { SacramentMeeting } from "../lib/types";
import { auth } from "@/auth";
import DeleteMeeting from "./DeleteMeeting";
import Link from "next/link";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default async function MeetingDetail({ meeting }: MeetingDetailProps) {
  const session = await auth();

  return (
    <>
      <article className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold">{meeting.date}</h1>
          <p className="capitalize">{meeting.meetingType} Meeting</p>
          <p>Presiding: {meeting.presiding}</p>
          <p>Conducting: {meeting.conducting}</p>
        </header>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <section>
            <h2 className="text-xl font-bold">Announcements</h2>
            <ul className="list-disc pl-6">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold">Opening</h2>
          <p>
            Hymn {meeting.openingHymn.number}: {meeting.openingHymn.title}
          </p>
          <p>Opening Prayer: {meeting.openingPrayer}</p>
        </section>

        {meeting.wardBusiness.length > 0 && (
          <section>
            <h2 className="text-xl font-bold">Ward Business</h2>
            <ul className="list-disc pl-6">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold">Stake Business</h2>
          <p>{meeting.stakeBusiness ? "Yes" : "No"}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Sacrament</h2>
          <p>
            Hymn {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Speakers</h2>
          <ul className="space-y-2">
            {meeting.speakers.map((speaker, index) => (
              <li key={index}>
                <strong>{speaker.name}</strong> — {speaker.topic}
                <span className="ml-2 capitalize text-slate-500">
                  ({speaker.type})
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">Closing</h2>
          <p>
            Hymn {meeting.closingHymn.number}: {meeting.closingHymn.title}
          </p>
          <p>Closing Prayer: {meeting.closingPrayer}</p>
        </section>
      </article>

      {session?.user && (
        <div className="mt-6 flex items-center gap-4">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="rounded-full bg-slate-800 px-5 py-2 font-semibold text-white transition duration-300 hover:scale-102 hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Edit Meeting
          </Link>

          <DeleteMeeting id={meeting.id} />
        </div>
      )}
    </>
  );
}
