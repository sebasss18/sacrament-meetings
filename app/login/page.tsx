import type { Metadata } from "next";
import Link from "next/link";
import LoginCard from "@/components/login/LoginCard";
import LoginForm from "@/components/login/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

const highlights = [
  {
    title: "Programa completo de cada reunión",
    text: "Organiza el orden de la reunión sacramental en un solo lugar.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    title: "Consulta pública",
    text: "Los miembros pueden ver las reuniones sin necesidad de una cuenta.",
    icon: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Edición protegida",
    text: "Solo el administrador puede crear, editar o eliminar reuniones.",
    icon: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      {/* Panel de contenido: solo escritorio */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white lg:flex xl:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        />

        <p className="relative text-lg font-semibold tracking-tight">
          Reuniones sacramentales
        </p>

        <div className="relative max-w-lg">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Planea cada reunión con calma
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Inicia sesión para crear y editar los programas de las reuniones.
          </p>

          <ul className="mt-10 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="group flex gap-4 p-5 transition-colors hover:bg-white/[0.05]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-slate-500">
          © {new Date().getFullYear()} Reuniones sacramentales
        </p>
      </aside>

      {/* Lado del formulario: fondo con puntos y tarjeta */}
      <section className="relative flex items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle,theme(colors.slate.300)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] dark:opacity-30 dark:[background-image:radial-gradient(circle,theme(colors.slate.700)_1px,transparent_1px)]"
        />

        <LoginCard>
          <div className="flex size-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Iniciar sesión
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
            Acceso solo para el administrador.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            ¿Solo quieres consultar?{" "}
            <Link
              href="/meetings"
              className="font-medium text-slate-900 underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-white"
            >
              Ver las reuniones
            </Link>
          </div>
        </LoginCard>
      </section>
    </main>
  );
}
