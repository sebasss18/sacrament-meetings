import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="m-2 mt-10 flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-slate-800 p-5 text-center text-white shadow-lg transition-shadow duration-500 hover:shadow-xl hover:shadow-sky-500/10 sm:flex-row sm:justify-between sm:p-6 sm:text-left">
      <div className="leading-tight">
        <p className="text-lg font-bold tracking-tight">Rio Sonora</p>
        <p className="flex items-center justify-center gap-2 text-sm text-white/60 sm:justify-start">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
          </span>
          Planificador de reuniones sacramentales
        </p>
      </div>

      <p className="text-xs text-white/40">© {year}</p>
    </footer>
  );
}
