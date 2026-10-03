import NavLinks from "./NavLinks";
import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";

async function AuthControls() {
  const session = await auth();

  return session?.user ? (
    <SignOutButton />
  ) : (
    <Link
      href="/login"
      className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
    >
      Sign In
    </Link>
  );
}

export default function Header() {
  const date = new Date().toLocaleDateString();

  return (
    <header className="m-2 flex flex-col gap-5 rounded-xl bg-slate-800 p-5 text-white font-serif sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <h1 className="text-2xl font-bold">Rio Sonora</h1>
        <p>{date}</p>
      </div>

      <div className="flex items-center justify-between gap-5 sm:justify-end">
        <NavLinks />
        <AuthControls />
      </div>
    </header>
  );
}
