"use client";

import { deleteMeeting } from "@/lib/actions";

interface DeleteMeetingProps {
  id: number;
}

export default function DeleteMeeting({ id }: DeleteMeetingProps) {
  return (
    <form
      action={deleteMeeting.bind(null, id)}
      onSubmit={(event) => {
        if (!confirm("Are you sure you want to delete this meeting?")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition duration-300 hover:scale-104 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950"
      >
        Delete
      </button>
    </form>
  );
}
