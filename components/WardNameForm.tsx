"use client";

import { useState, type FormEvent } from "react";

export default function WardNameForm() {
  const [initialWardName] = useState(() =>
    typeof window === "undefined" ? "" : localStorage.getItem("wardName") || "",
  );
  const [wardName, setWardName] = useState(initialWardName);
  const [saved, setSaved] = useState(Boolean(initialWardName));
  const [editing, setEditing] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = wardName.trim();

    if (!name) return;

    localStorage.setItem("wardName", name);
    window.dispatchEvent(new Event("wardNameChanged"));

    setWardName(name);
    setSaved(true);
    setEditing(false);
  }

  if (saved && !editing) {
    return (
      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm text-slate-300">
          Barrio: <span className="font-medium text-white">{wardName}</span>
        </span>

        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          Cambiar
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-3">
      <label
        htmlFor="wardName"
        className="block text-sm font-medium text-slate-200"
      >
        Nombre de tu barrio
      </label>

      <input
        id="wardName"
        name="wardName"
        type="text"
        maxLength={100}
        value={wardName}
        onChange={(event) => setWardName(event.target.value)}
        placeholder="Ej. Barrio Río Sonora"
        required
        className="w-full rounded-xl border border-white/15 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/10"
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
        >
          Guardar nombre
        </button>

        {editing && (
          <button
            type="button"
            onClick={() => {
              setWardName(localStorage.getItem("wardName") || "");
              setEditing(false);
            }}
            className="px-3 py-2 text-sm text-slate-300 transition hover:text-white"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
