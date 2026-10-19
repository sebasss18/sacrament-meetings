import { NextResponse } from "next/server";
import { auth } from "@/auth";
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
  if (!(await auth())?.user) {
    return NextResponse.json(
      { error: "No has iniciado sesión." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const validation = MeetingFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Los datos de la reunión no son válidos.",
          issues: validation.error.issues,
        },
        { status: 400 },
      );
    }

    const meeting = await createMeeting(validation.data);

    return NextResponse.json(meeting, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la solicitud debe ser JSON válido." },
      { status: 400 },
    );
  }
}
