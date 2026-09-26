import { NextResponse } from "next/server";
import { createMeeting, getMeetings } from "@/lib/meetings-db";
import { MeetingFormSchema } from "@/lib/schemas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const meetings = await getMeetings();

  const filteredMeetings = date
    ? meetings.filter((meeting) => meeting.date === date)
    : meetings;

  return NextResponse.json(filteredMeetings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = MeetingFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid meeting payload",
          issues: validation.error.issues,
        },
        { status: 400 },
      );
    }

    const meeting = await createMeeting(validation.data);

    return NextResponse.json(meeting, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }
}
