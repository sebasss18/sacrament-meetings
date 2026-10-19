import Link from "next/link";

const links = [
  { href: "/meetings", label: "Reuniones" },
  { href: "/login", label: "Administrar" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      {/* Línea de luz en el borde superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent"
      />

      {/* Cuadrícula tenue, igual que el panel del login */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-10 text-center sm:px-12 md:flex-row md:justify-between md:text-left lg:px-16">
        <div className="leading-tight">
          <p className="text-xl font-bold tracking-tight">Rio Sonora</p>
          <p className="mt-1.5 flex items-center justify-center gap-2 text-sm font-medium text-white/60 md:justify-start">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-300 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-1.5 rounded-full bg-sky-300" />
            </span>
            Planificador de reuniones sacramentales
          </p>
        </div>

        <nav aria-label="Pie de página">
          <ul className="flex items-center gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/70 outline-none transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300/60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative border-t border-white/5">
        <p className="mx-auto max-w-6xl px-6 py-4 text-center text-xs font-medium text-white/50 sm:px-12 md:text-left lg:px-16">
          © {year} Rio Sonora. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
