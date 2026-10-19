import { NextResponse } from "next/server";
import { auth } from "@/auth";
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
    return NextResponse.json(
      { error: "El identificador de la reunión no es válido." },
      { status: 400 },
    );
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json(
      { error: "No se encontró la reunión." },
      { status: 404 },
    );
  }

  return NextResponse.json(meeting);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await auth())?.user) {
    return NextResponse.json(
      { error: "No has iniciado sesión." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    return NextResponse.json(
      { error: "El identificador de la reunión no es válido." },
      { status: 400 },
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

    const existingMeeting = await getMeetingById(meetingId);
    if (!existingMeeting) {
      return NextResponse.json(
        { error: "No se encontró la reunión." },
        { status: 404 },
      );
    }

    const updatedMeeting = await updateMeeting(meetingId, validation.data);

    return NextResponse.json(updatedMeeting, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la solicitud debe ser JSON válido." },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await auth())?.user) {
    return NextResponse.json(
      { error: "No has iniciado sesión." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    return NextResponse.json(
      { error: "El identificador de la reunión no es válido." },
      { status: 400 },
    );
  }

  const deleted = await deleteMeeting(meetingId);

  if (!deleted) {
    return NextResponse.json(
      { error: "No se encontró la reunión." },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
