export default function MeetingsLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando reuniones...</span>

      <h1 className="text-3xl font-bold">Reuniones sacramentales</h1>
      <p className="mt-2">Consulta todas las reuniones pasadas y próximas.</p>

      <div className="animate-pulse">
        <div className="mt-4 mb-8 h-12 rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="space-y-4 rounded-xl border border-slate-200 bg-slate-100 p-5 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="h-6 w-2/3 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="space-y-2.5">
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-4/6 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="size-10 rounded-xl bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
