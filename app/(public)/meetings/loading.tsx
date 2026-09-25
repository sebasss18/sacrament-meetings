export default function MeetingsLoading() {
  return (
    <main>
      <h1 className="text-3xl font-bold">Sacrament Meetings</h1>
      <p className="mt-2">View all upcoming and past meetings.</p>

      <div className="mt-6 flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 space-y-3 animate-pulse"
          >
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
          />
        ))}
      </div>
    </main>
  );
}
