import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

let sql: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!sql) {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is not configured. Add it to .env.local or your runtime environment before running Next.js.",
      );
    }
    sql = neon(databaseUrl);
  }
  return sql;
}

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await getSql()`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = "",
): Promise<number> {
  const searchTerm = `%${query}%`;

  const rows = await getSql()`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  const countRows = rows as Array<{ count: string | number }>;
  const totalCount = Number(countRows[0]?.count ?? 0);

  return Math.ceil(totalCount / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const rows = await getSql()`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;

  const meetingRows = rows as Array<Record<string, unknown>>;

  return (meetingRows[0] as unknown as SacramentMeeting) ?? null;
}

export async function createMeeting(
  data: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  const rows = await getSql()`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? []},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers)},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;

  const createdMeetingRows = rows as Array<Record<string, unknown>>;

  return createdMeetingRows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting | null> {
  const rows = await getSql()`
    UPDATE meetings
    SET
      date = ${updates.date},
      meeting_type = ${updates.meetingType},
      presiding = ${updates.presiding},
      conducting = ${updates.conducting},
      announcements = ${updates.announcements ?? []},
      opening_hymn = ${JSON.stringify(updates.openingHymn)},
      opening_prayer = ${updates.openingPrayer},
      ward_business = ${JSON.stringify(updates.wardBusiness)},
      stake_business = ${updates.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(updates.sacramentHymn)},
      speakers = ${JSON.stringify(updates.speakers)},
      closing_hymn = ${JSON.stringify(updates.closingHymn)},
      closing_prayer = ${updates.closingPrayer}
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;

  const updatedMeetingRows = rows as Array<Record<string, unknown>>;

  return (updatedMeetingRows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = (await getSql()`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `) as Array<{ id: number }>;

  return rows.length > 0;
}
