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
    WHERE email = ${email}
    LIMIT 1
  `;

  const userRows = rows as Array<{
    id: number;
    email: string;
    password: string;
  }>;

  return userRows[0] ?? null;
}
