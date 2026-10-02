import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../../components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return {
      title: "Meeting Not Found",
      description: "The requested sacrament meeting could not be found.",
    };
  }

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    return {
      title: "Meeting Not Found",
      description: "The requested sacrament meeting could not be found.",
    };
  }

  const speakerNames = meeting.speakers
    .map((speaker) => speaker.name)
    .join(", ");
  const date = new Date(meeting.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    title: `${date} Meeting`,
    description: `${date} • ${meeting.meetingType} meeting led by ${meeting.presiding}. Speakers: ${speakerNames || "details available"}.`,
    openGraph: {
      title: `${date} Meeting`,
      description: `${date} • ${meeting.meetingType} meeting led by ${meeting.presiding}. Speakers: ${speakerNames || "details available"}.`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${date} sacrament meeting details`,
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
