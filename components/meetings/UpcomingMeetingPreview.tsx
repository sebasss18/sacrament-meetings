import type { HomeMeetingPreview } from "@/lib/types";
import { getTodayInMountainTime } from "@/lib/date-utils";

const MS_PER_DAY = 86_400_000;
/** Los detalles se publican un día antes de la reunión y siguen visibles ese mismo día. */
const DETAILS_VISIBLE_DAYS_BEFORE = 1;

function toUtcDay(date: string): number {
  return Date.parse(`${date}T00:00:00Z`);
}

function getDaysUntilMeeting(meetingDate: string): number {
  return Math.round(
    (toUtcDay(meetingDate) - toUtcDay(getTodayInMountainTime())) / MS_PER_DAY,
  );
}

function formatMeetingDate(date: string): string {
  const formatted = new Date(toUtcDay(date)).toLocaleDateString("es-MX", {
    dateStyle: "full",
    timeZone: "UTC",
  });
  // "domingo, 8 de noviembre de 2026" -> primera letra en mayúscula
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function getRelativeLabel(days: number): string | null {
  if (days === 0) return "Hoy";
  if (days === 1) return "Mañana";
  if (days > 1 && days <= 7) return `En ${days} días`;
  return null;
}

function Ornament() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-slate-300/40" />
      <span className="size-1.5 rounded-full bg-slate-200 shadow-[0_0_10px_2px_rgba(226,232,240,0.4)]" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-slate-300/40" />
    </div>
  );
}

function SubsectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h3
      id={id}
      className="border-b border-white/[0.07] pb-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-300"
    >
      {children}
    </h3>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6 py-12 text-center font-serif text-lg italic text-slate-400">
      {children}
    </div>
  );
}

function MeetingDetails({ meeting }: { meeting: HomeMeetingPreview }) {
  const speakers = meeting.speakers.filter((s) => s.type === "speaker");
  const hymns = [
    { label: "Himno de apertura", hymn: meeting.openingHymn },
    { label: "Himno sacramental", hymn: meeting.sacramentHymn },
    { label: "Himno de clausura", hymn: meeting.closingHymn },
  ];

  return (
    <div className="grid gap-12 px-6 py-10 sm:px-10 md:grid-cols-2 md:gap-14 md:py-12">
      <section aria-labelledby="himnos-title">
        <SubsectionTitle id="himnos-title">Himnos</SubsectionTitle>
        <ul className="divide-y divide-white/[0.05]">
          {hymns.map(({ label, hymn }) => (
            <li key={label} className="py-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                {label}
              </p>
              <p className="mt-2 flex items-baseline gap-3">
                <span className="font-serif text-xl text-slate-100 [text-shadow:0_0_14px_rgba(226,232,240,0.4)]">
                  {hymn.number}
                </span>
                <span className="font-serif text-lg text-slate-200">
                  {hymn.title}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-12">
        <section aria-labelledby="discursantes-title">
          <SubsectionTitle id="discursantes-title">
            Discursantes
          </SubsectionTitle>
          {speakers.length > 0 ? (
            <ul className="divide-y divide-white/[0.05]">
              {speakers.map((speaker, index) => (
                <li key={`${speaker.name}-${index}`} className="py-5">
                  <p className="font-serif text-lg text-slate-100">
                    {speaker.name}
                  </p>
                  {speaker.topic && (
                    <p className="mt-1 font-serif text-base italic text-slate-400">
                      {speaker.topic}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="pt-5 font-serif italic text-slate-500">
              No hay discursantes programados.
            </p>
          )}
        </section>

        <section aria-labelledby="asuntos-title">
          <SubsectionTitle id="asuntos-title">Asuntos</SubsectionTitle>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="space-y-4 pt-5">
              {meeting.wardBusiness.map(({ description }, index) => (
                <li
                  key={`${description}-${index}`}
                  className="flex items-start gap-4 text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-slate-300 shadow-[0_0_8px_1px_rgba(226,232,240,0.35)]"
                  />
                  <span className="leading-7">{description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pt-5 font-serif italic text-slate-500">
              No hay asuntos del barrio programados.
            </p>
          )}
          {meeting.stakeBusiness && (
            <p className="pt-5 font-serif italic text-slate-400">
              También habrá asuntos de la estaca.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default function UpcomingMeetingPreview({
  meeting,
}: {
  meeting: HomeMeetingPreview | null;
}) {
  // Solo mostramos reuniones de hoy o futuras.
  const daysUntil = meeting ? getDaysUntilMeeting(meeting.date) : null;
  const upcoming =
    meeting && daysUntil !== null && daysUntil >= 0
      ? { meeting, daysUntil }
      : null;

  const detailsAreAvailable =
    upcoming !== null && upcoming.daysUntil <= DETAILS_VISIBLE_DAYS_BEFORE;

  const relativeLabel = upcoming ? getRelativeLabel(upcoming.daysUntil) : null;

  return (
    <section
      id="proxima-reunion"
      aria-labelledby="proxima-reunion-title"
      className="scroll-mt-20 bg-slate-950 px-6 pb-24 pt-8 text-white sm:px-12 md:px-16 lg:px-20"
    >
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
            Reunión sacramental
          </p>
          <h2
            id="proxima-reunion-title"
            className="mt-4 bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text font-serif text-4xl font-normal tracking-tight text-transparent drop-shadow-[0_0_22px_rgba(226,232,240,0.25)] sm:text-5xl"
          >
            Próxima reunión
          </h2>
          <div className="mt-6">
            <Ornament />
          </div>
        </header>

        {!upcoming ? (
          <EmptyState>No hay próxima reunión programada.</EmptyState>
        ) : (
          <article className="mt-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] shadow-[0_0_60px_-24px_rgba(226,232,240,0.15)]">
            <div className="border-b border-white/[0.07] px-6 py-10 text-center sm:px-10">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Fecha de la reunión
              </p>
              <p className="mt-3 font-serif text-2xl text-slate-50 [text-shadow:0_0_24px_rgba(226,232,240,0.22)] sm:text-3xl">
                {formatMeetingDate(upcoming.meeting.date)}
              </p>
              {relativeLabel && (
                <p className="mt-5 inline-block rounded-full border border-white/15 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200 shadow-[0_0_18px_-4px_rgba(226,232,240,0.35)]">
                  {relativeLabel}
                </p>
              )}
            </div>

            {detailsAreAvailable ? (
              <MeetingDetails meeting={upcoming.meeting} />
            ) : (
              <p className="px-6 py-10 text-center font-serif text-lg italic text-slate-400 sm:px-10">
                Los detalles se publicarán un día antes de la reunión.
              </p>
            )}
          </article>
        )}
      </div>
    </section>
  );
}
