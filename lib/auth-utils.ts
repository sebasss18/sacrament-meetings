export function isAdminEmail(email: string | null | undefined): boolean {
  const normalizedEmail = email?.trim().toLowerCase();
  const adminEmail = process.env.AUTH_EMAIL?.trim().toLowerCase();

  return Boolean(
    normalizedEmail && (!adminEmail || normalizedEmail === adminEmail),
  );
}
