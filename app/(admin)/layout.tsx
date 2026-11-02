import { auth } from "@/auth";
import MeetingsNavigation from "@/components/meetings/MeetingsNavigation";
import { isAdminEmail } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!isAdminEmail(session?.user?.email)) {
    redirect("/login");
  }

  return (
    <section>
      <MeetingsNavigation isAuthenticated />
      {children}
    </section>
  );
}
