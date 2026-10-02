import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to manage sacrament meetings.",
};

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
        <h1 className="font-serif text-3xl font-bold text-slate-800 dark:text-white">
          Owner Sign In
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Sign in to create, edit, or delete meeting plans.
        </p>
        <LoginForm />
      </div>
    </section>
  );
}
