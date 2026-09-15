import MeetingDetail from "../../../components/MeetingDetail";
import { getMeetings } from "../../../lib/meetings-db";

export default function CurrentMeetingPage() {
  const meetings = getMeetings();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingMeeting = meetings
    .filter((meeting) => new Date(meeting.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  if (!upcomingMeeting) {
    return (
      <main>
        <h1 className="mb-6 text-3xl font-bold">Current Meeting</h1>
        <p>No current meeting scheduled.</p>
      </main>
    );
  }

  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold">Current Meeting</h1>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <MeetingDetail meeting={upcomingMeeting} />
      </div>
    </main>
  );
}
