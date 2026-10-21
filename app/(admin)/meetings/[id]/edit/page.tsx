import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditMeeting from "@/components/meetings/EditMeeting";
import { getMeetingById } from "@/lib/meetings-db";

const getMeeting = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) return null;
  return getMeetingById(Number(id));
});

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("es-MX", {
    dateStyle: "long",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeeting(id);

  return {
    title: meeting
      ? `Editar reunión del ${formatDate(meeting.date)}`
      : "Editar reunión",
    description: meeting
      ? `Actualiza el plan de la reunión sacramental del ${formatDate(meeting.date)}.`
      : "Edita un plan existente de reunión sacramental.",
    robots: { index: false, follow: false },
  };
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return <EditMeeting meeting={meeting} />;
}
