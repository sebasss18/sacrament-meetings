import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../../components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import { meetingTypeLabels } from "@/lib/labels";

export const dynamic = "force-dynamic";

const getMeeting = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) return null;
  return getMeetingById(Number(id));
});

const notFoundMetadata: Metadata = {
  title: "No se encontró la reunión",
  description: "No se pudo encontrar la reunión sacramental solicitada.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeeting(id);

  if (!meeting) return notFoundMetadata;

  const speakerNames = meeting.speakers
    .map((speaker) => speaker.name)
    .join(", ");
  const date = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    "es-MX",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );
  const title = `Reunión del ${date}`;
  const description = `${date} • ${meetingTypeLabels[meeting.meetingType]} presidida por ${meeting.presiding}. Discursantes: ${speakerNames || "detalles disponibles"}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `Detalles de la reunión sacramental del ${date}`,
        },
      ],
    },
  };
}

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
