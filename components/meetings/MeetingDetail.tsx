import type { ReactNode } from "react";
import Link from "next/link";
import { auth } from "@/auth";
import DeleteMeeting from "./DeleteMeeting";
import type { SacramentMeeting } from "@/lib/types";
import { meetingTypeLabels, speakerTypeLabels } from "@/lib/labels";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function Section({
  title,
  first,
  children,
}: {
  title: string;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`mb-8 ${first ? "" : "border-t border-slate-200 pt-8"}`}
    >
      <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-800">
        <span className="h-5 w-1 rounded-full bg-sky-400" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-0.5 font-medium text-slate-800">{value}</dd>
    </div>
  );
}

function Hymn({ hymn }: { hymn: { number: number; title: string } }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="flex h-9 min-w-9 items-center justify-center rounded-md bg-slate-800 px-2 text-sm font-semibold text-white">
        {hymn.number}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Himno
        </p>
        <p className="font-medium text-slate-800">{hymn.title}</p>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-slate-700">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function MeetingDetail({ meeting }: MeetingDetailProps) {
  const session = await auth();

  const date = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    "es-MX",
    { dateStyle: "long" },
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Link
        href="/meetings"
        className="group mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors duration-300 hover:text-slate-900"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        Volver a reuniones
      </Link>

      <article className="rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
        <header className="mb-8">
          <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
            </span>
            {meetingTypeLabels[meeting.meetingType]}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
            {date}
          </h1>

          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <Detail label="Preside" value={meeting.presiding} />
            <Detail label="Dirige" value={meeting.conducting} />
          </dl>
        </header>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <Section title="Anuncios" first>
            <BulletList items={meeting.announcements} />
          </Section>
        )}

        <Section
          title="Inicio"
          first={!meeting.announcements || meeting.announcements.length === 0}
        >
          <div className="space-y-4">
            <Hymn hymn={meeting.openingHymn} />
            <dl>
              <Detail label="Oración inicial" value={meeting.openingPrayer} />
            </dl>
          </div>
        </Section>

        {meeting.wardBusiness.length > 0 && (
          <Section title="Asuntos del barrio">
            <BulletList
              items={meeting.wardBusiness.map((item) => item.description)}
            />
          </Section>
        )}

        <Section title="Asuntos de la estaca">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              meeting.stakeBusiness
                ? "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
                : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {meeting.stakeBusiness ? "Sí" : "No"}
          </span>
        </Section>

        <Section title="Santa Cena">
          <Hymn hymn={meeting.sacramentHymn} />
        </Section>

        <Section title="Discursantes">
          <ol className="space-y-3">
            {meeting.speakers.map((speaker, index) => (
              <li
                key={index}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-shadow duration-300 hover:shadow-md"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <p className="font-semibold text-slate-800">{speaker.name}</p>
                  <p className="mt-0.5 text-slate-600">{speaker.topic}</p>
                  <p className="mt-2 inline-flex rounded-full bg-white px-2.5 py-0.5 text-xs font-medium capitalize text-slate-500 ring-1 ring-slate-200">
                    {speakerTypeLabels[speaker.type]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Cierre">
          <div className="space-y-4">
            <Hymn hymn={meeting.closingHymn} />
            <dl>
              <Detail label="Oración final" value={meeting.closingPrayer} />
            </dl>
          </div>
        </Section>

        {session?.user && (
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
            <Link
              href={`/meetings/${meeting.id}/edit`}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-700 hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 active:scale-100"
            >
              Editar reunión
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <DeleteMeeting id={meeting.id} />
          </div>
        )}
      </article>
    </div>
  );
}
