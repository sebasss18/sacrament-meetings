import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditMeeting from "@/components/EditMeeting";
import { getMeetingById } from "@/lib/meetings-db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return {
      title: "Editar reunión",
      description: "Edita un plan existente de reunión sacramental.",
    };
  }

  const meeting = await getMeetingById(Number(id));

  return {
    title: meeting
      ? `Editar reunión del ${new Date(`${meeting.date}T00:00:00`).toLocaleDateString("es-MX", { dateStyle: "long" })}`
      : "Editar reunión",
    description: meeting
      ? `Actualiza el plan de la reunión sacramental del ${new Date(`${meeting.date}T00:00:00`).toLocaleDateString("es-MX", { dateStyle: "long" })}.`
      : "Edita un plan existente de reunión sacramental.",
  };
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return <EditMeeting meeting={meeting} />;
}
