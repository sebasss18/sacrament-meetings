import { auth } from "@/auth";
import MeetingsNavigation from "@/components/MeetingsNavigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <section>
      <MeetingsNavigation isAuthenticated={Boolean(session?.user)} />
      {children}
    </section>
  );
}
