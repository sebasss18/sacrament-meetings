import MeetingCard from "../../components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <main>
      <h1 className="text-3xl font-bold">Sacrament Meetings</h1>
      <p className="mt-2">View all upcoming and past meetings.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </main>
  );
}
