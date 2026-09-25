import EditMeeting from "@/components/EditMeeting";
import { getMeetingById } from "@/lib/meetings-db";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    return null;
  }

  return <EditMeeting meeting={meeting} />;
}
