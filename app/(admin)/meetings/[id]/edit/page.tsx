import { notFound } from "next/navigation";
import EditMeeting from "@/components/EditMeeting";
import { getMeetingById } from "@/lib/meetings-db";

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
