// Database access for private user accounts.
import { neon } from "@neondatabase/serverless";

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
