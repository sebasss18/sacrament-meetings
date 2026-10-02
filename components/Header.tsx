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
    <header className="flex items-center justify-between bg-slate-800 p-6 text-white m-2 rounded-xl font-serif">
      <div>
        <h1 className="text-2xl font-bold">Rio Sonora</h1>
        <p>{date}</p>
      </div>
      <div className="flex items-center gap-5">
        <NavLinks />
        <AuthControls />
      </div>
    </header>
  );
}
