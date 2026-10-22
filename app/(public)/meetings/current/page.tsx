import type { Metadata } from "next";
import MeetingDetail from "@/components/meetings/MeetingDetail";
import { getMeetings } from "../../../../lib/meetings-db";

export const metadata: Metadata = {
  title: "Reunión actual",
  description:
    "Consulta los detalles de la próxima reunión sacramental, incluidos discursantes, himnos, asuntos del barrio y anuncios.",
};

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingMeeting = meetings
    .filter((meeting) => new Date(meeting.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  if (!upcomingMeeting) {
    return (
      <main>
        <h1 className="mb-6 text-3xl font-bold">Reunión actual</h1>
        <p>No hay ninguna reunión programada actualmente.</p>
      </main>
    );
  }

  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold">Reunión actual</h1>
      <MeetingDetail meeting={upcomingMeeting} />
    </main>
  );
}
