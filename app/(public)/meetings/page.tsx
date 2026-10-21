import type { Metadata } from "next";
import MeetingCard from "@/components/meetings/MeetingCard";
import { MeetingSearch } from "@/components/meetings/MeetingSearch";
import { Pagination } from "@/components/meetings/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const metadata: Metadata = {
  title: "Directorio de reuniones",
  description:
    "Consulta reuniones sacramentales pasadas y próximas, revisa discursos, himnos y anuncios, y filtra por fecha o palabra clave.",
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
      <h1 className="text-3xl font-bold">Reuniones sacramentales</h1>
      <p className="mt-2">Consulta todas las reuniones pasadas y próximas.</p>

      <MeetingSearch />

      {meetings.length === 0 ? (
        <p className="mt-8 text-slate-600">No se encontraron reuniones.</p>
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
