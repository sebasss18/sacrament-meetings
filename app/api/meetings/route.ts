import { NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    const meetings = getMeetings();

    const filteredMeetings = date
    ? meetings.filter((meeting) => meeting.date === date)
    : meetings;

    return NextResponse.json(filteredMeetings);
}