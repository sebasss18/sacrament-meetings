import type { Metadata } from "next";
import MeetingCard from "../../../components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const metadata: Metadata = {
  title: "Meeting Directory",
  description:
    "Browse upcoming and past sacrament meetings, explore talks, hymns, and announcements, and filter by date or keyword.",
};

export const dynamic = "force-dynamic";

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main>
      <h1 className="text-3xl font-bold">Sacrament Meetings</h1>
      <p className="mt-2">View all upcoming and past meetings.</p>

      <MeetingSearch />

      {meetings.length === 0 ? (
        <p className="mt-8 text-slate-600">No meetings found.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {totalPages > 0 && <Pagination totalPages={totalPages} />}
    </main>
  );
}
