// Database access for users and administrator identity.
import { neon } from "@neondatabase/serverless";
import { isAdminEmail } from "@/lib/auth-utils";

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

export async function getUserByEmail(email: string) {
  const rows = await getSql()`
    SELECT
      id,
      email,
      password
    FROM users
    WHERE LOWER(email) = LOWER(${email})
    LIMIT 1
  `;

  return getUserFromRows(rows);
}

export async function getUserById(id: number) {
  const rows = await getSql()`
    SELECT
      id,
      email,
      password
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;

  return getUserFromRows(rows);
}

function getUserFromRows(rows: unknown) {
  const userRows = rows as Array<{
    id: number;
    email: string;
    password: string;
  }>;

  return userRows[0] ?? null;
}

export async function claimOrVerifyAdminAccount(
  userId: number,
  email: string,
): Promise<boolean> {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS sacrament_admin_account (
      singleton BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (singleton),
      user_id TEXT NOT NULL
    )
  `;

  const existingRows = await sql`
    SELECT user_id
    FROM sacrament_admin_account
    WHERE singleton = TRUE
    LIMIT 1
  `;
  const existing = existingRows[0] as { user_id: string } | undefined;

  if (existing) {
    return existing.user_id === String(userId);
  }

  if (!isAdminEmail(email)) {
    return false;
  }

  await sql`
    INSERT INTO sacrament_admin_account (singleton, user_id)
    VALUES (TRUE, ${String(userId)})
    ON CONFLICT (singleton) DO NOTHING
  `;

  const ownerRows = await sql`
    SELECT user_id
    FROM sacrament_admin_account
    WHERE singleton = TRUE
    LIMIT 1
  `;
  const owner = ownerRows[0] as { user_id: string } | undefined;

  return owner?.user_id === String(userId);
}

export async function updateUserEmail(userId: number, email: string) {
  await getSql()`
    UPDATE users
    SET email = ${email}
    WHERE id = ${userId}
  `;
}

export async function updateUserPassword(userId: number, password: string) {
  await getSql()`
    UPDATE users
    SET password = ${password}
    WHERE id = ${userId}
  `;
}
