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
      title: "Edit Meeting",
      description: "Edit an existing sacrament meeting plan.",
    };
  }

  const meeting = await getMeetingById(Number(id));

  return {
    title: meeting ? `Edit ${meeting.date}` : "Edit Meeting",
    description: meeting
      ? `Update the sacrament meeting plan for ${meeting.date}.`
      : "Edit an existing sacrament meeting plan.",
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
