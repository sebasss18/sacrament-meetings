import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../../components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import { meetingTypeLabels } from "@/lib/labels";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return {
      title: "No se encontró la reunión",
      description: "No se pudo encontrar la reunión sacramental solicitada.",
    };
  }

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    return {
      title: "No se encontró la reunión",
      description: "No se pudo encontrar la reunión sacramental solicitada.",
    };
  }

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

  return {
    title: `Reunión del ${date}`,
    description: `${date} • ${meetingTypeLabels[meeting.meetingType]} presidida por ${meeting.presiding}. Discursantes: ${speakerNames || "detalles disponibles"}.`,
    openGraph: {
      title: `Reunión del ${date}`,
      description: `${date} • ${meetingTypeLabels[meeting.meetingType]} presidida por ${meeting.presiding}. Discursantes: ${speakerNames || "detalles disponibles"}.`,
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

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
