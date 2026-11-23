import Link from "next/link";

const appName = "Planificador de reuniones sacramentales";

const links = [
  { href: "/meetings", label: "Reuniones" },
  { href: "/login", label: "Administrar" },
];

type FooterProps = {
  wardName?: string;
};

export default function Footer({ wardName }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-12 md:grid-cols-[1.5fr_1fr] lg:px-16">
        <div>
          <p className="text-xl font-bold tracking-tight">
            {wardName ?? appName}
          </p>
          {wardName && (
            <p className="mt-1.5 text-sm font-medium text-white/60">
              {appName}
            </p>
          )}
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Navegación
          </h2>
          <ul className="mt-4 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white/70 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:underline"
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
          © {year} {wardName ?? appName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
