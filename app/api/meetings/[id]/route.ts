import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
    request:Request,
    { params }: { params: Promise<{id: string }>}
) {
    const { id } = await params;
    const meetingId = Number(id);

    if (isNaN(meetingId)) {
        return NextResponse.json(
            { error: "Invalid meeting ID"},
            { status: 400}
        );
    }

    const meeting = getMeetingById(meetingId);

    if (!meeting) {
        return NextResponse.json(
            { error: "Meeting not found"},
            { status: 404}
        );
    }

    return NextResponse.json(meeting);
}

