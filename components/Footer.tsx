export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto flex flex-col items-center gap-5 border-t border-white/10 bg-slate-950 px-6 py-8 text-center text-white sm:flex-row sm:justify-between sm:px-12 sm:text-left md:px-16 lg:px-20">
      <div className="leading-tight">
        <p className="text-xl font-bold tracking-tight">Rio Sonora</p>
        <p className="mt-1 flex items-center justify-center gap-2 text-sm font-medium text-white/60 sm:justify-start">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
          </span>
          Planificador de reuniones sacramentales
        </p>
      </div>

      <p className="text-sm font-semibold text-white/60">
        © {year} Rio Sonora. Todos los derechos reservados.
      </p>
    </footer>
  );
}
