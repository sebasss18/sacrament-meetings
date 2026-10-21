export default function CurrentMeetingLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando reunión actual...</span>

      <h1 className="mb-6 text-3xl font-bold">Reunión actual</h1>

      <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="h-7 w-56 rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-700" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-5 w-28 rounded bg-slate-200 dark:bg-slate-700" />
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-slate-200 dark:bg-slate-700"
                style={{ width: `${90 - i * 15}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-2.5 border-t border-slate-200 pt-6 dark:border-slate-700">
          <div className="h-5 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </main>
  );
}
