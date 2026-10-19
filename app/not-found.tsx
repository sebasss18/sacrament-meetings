import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold">No se encontró esta página</h1>
      <p className="mt-3 text-slate-600">
        Es posible que la página se haya movido o que la dirección sea
        incorrecta.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
