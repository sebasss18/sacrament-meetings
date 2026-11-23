// Administrator account settings page.
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AccountForm from "@/components/account/AccountForm";
import { getUserById } from "@/lib/data";
import UserAvatar from "@/components/account/UserAvatar";

const description = "Administra el correo y la contraseña de tu cuenta.";

export const metadata: Metadata = {
  title: "Mi cuenta",
  description,
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const isValidAdmin =
    session?.user?.isAdmin === true &&
    Number.isSafeInteger(userId) &&
    userId > 0;

  if (!isValidAdmin) {
    redirect("/login");
  }

  const user = await getUserById(userId);

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <header className="md:sticky md:top-24 md:self-start">
          <UserAvatar seed={user.email} className="size-24" />
          <p className="mt-8 text-sm font-medium text-sky-600 dark:text-sky-400">
            Administración
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Mi cuenta
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {description}
          </p>
          <p className="mt-6 truncate text-sm text-slate-500">{user.email}</p>
        </header>

        <div className="border-t border-slate-200 pt-10 dark:border-white/10 md:border-l md:border-t-0 md:pl-16 md:pt-0">
          <AccountForm email={user.email} />
        </div>
      </div>
    </main>
  );
}
