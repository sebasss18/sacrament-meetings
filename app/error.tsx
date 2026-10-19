"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">Ocurrió un error inesperado</h1>
      <p className="mt-3 text-slate-600">
        No pudimos cargar esta página. Inténtalo de nuevo.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
      >
        Intentar de nuevo
      </button>
    </section>
  );
}
