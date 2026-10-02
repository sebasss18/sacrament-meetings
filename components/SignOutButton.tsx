import { signOutAction } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
      >
        Sign Out
      </button>
    </form>
  );
}
