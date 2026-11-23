// Protects meeting pages and their navigation.
import { auth } from "@/auth";
import MeetingsNavigation from "@/components/meetings/MeetingsNavigation";
import { redirect } from "next/navigation";

export default async function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user?.isAdmin !== true) {
    redirect("/login");
  }

  return (
    <section>
      <MeetingsNavigation isAuthenticated />
      {children}
    </section>
  );
}
