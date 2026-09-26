"use client";

import { useActionState } from "react";
import { deleteMeeting, type FormState } from "@/lib/actions";

interface DeleteMeetingProps {
  id: number;
}

const initialState: FormState = {
  message: "",
  errors: {},
};

export default function DeleteMeeting({ id }: DeleteMeetingProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState | undefined) => {
      return deleteMeeting(id);
    },
    initialState,
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!confirm("Are you sure you want to delete this meeting?")) {
          event.preventDefault();
        }
      }}
    >
      {state.message && (
        <p className="mb-2 text-sm text-red-600">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition duration-300 hover:scale-104 hover:bg-red-50 disabled:opacity-60 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
