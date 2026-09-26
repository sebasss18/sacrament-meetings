import { NextResponse } from "next/server";
import {
  deleteMeeting,
  getMeetingById,
  updateMeeting,
} from "@/lib/meetings-db";
import { MeetingFormSchema } from "@/lib/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    return NextResponse.json({ error: "Invalid meeting ID" }, { status: 400 });
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }

  return NextResponse.json(meeting);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    return NextResponse.json({ error: "Invalid meeting ID" }, { status: 400 });
  }

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

    const existingMeeting = await getMeetingById(meetingId);
    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    const updatedMeeting = await updateMeeting(meetingId, validation.data);

    return NextResponse.json(updatedMeeting, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    return NextResponse.json({ error: "Invalid meeting ID" }, { status: 400 });
  }

  const deleted = await deleteMeeting(meetingId);

  if (!deleted) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
