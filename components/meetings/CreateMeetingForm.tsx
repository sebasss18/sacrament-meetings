"use client";

import { useActionState, useRef, useState } from "react";
import { createMeeting, type FormState } from "@/lib/actions";

const initialState: FormState = {
  message: "",
  errors: {},
};

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-300/60";

const cardInputClass = inputClass.replace("bg-slate-50", "bg-white");

const pillInputClass =
  "rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-800 focus:ring-2 focus:ring-sky-300/60";

const selectClass = "appearance-none cursor-pointer pr-10";

const pillSelectClass = `${pillInputClass} appearance-none cursor-pointer pr-8`;

function SelectWrapper({
  children,
  className = "",
  compact = false,
}: {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`group relative ${className}`}>
      {children}
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-300 group-hover:text-slate-700 group-focus-within:rotate-180 group-focus-within:text-slate-800 ${
          compact ? "right-2.5 h-3.5 w-3.5" : "right-3 h-4 w-4"
        }`}
      >
        <path d="M5 7.5l5 5 5-5" />
      </svg>
    </div>
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite">
      {errors?.map((error) => (
        <p key={error} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}

function Section({
  title,
  first,
  children,
}: {
  title: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`mb-8 ${first ? "" : "border-t border-slate-200 pt-8"}`}
    >
      <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-800">
        <span className="h-5 w-1 rounded-full bg-sky-400" />
        {title}
      </h2>
      {children}
    </section>
  );
}

type Speaker = {
  id: number;
  name: string;
  topic: string;
  type: string;
};

type Calling = {
  id: number;
  type: string;
  name: string;
  position: string;
};

export default function CreateMeetingForm() {
  const nextId = useRef(1);
  const nextCallingId = useRef(0);
  const [speakers, setSpeakers] = useState<Speaker[]>([
    { id: 0, name: "", topic: "", type: "speaker" },
  ]);
  const [callings, setCallings] = useState<Calling[]>([]);

  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState,
  );

  const updateSpeaker = (id: number, field: keyof Speaker, value: string) =>
    setSpeakers((current) =>
      current.map((speaker) =>
        speaker.id === id ? { ...speaker, [field]: value } : speaker,
      ),
    );

  const addSpeaker = () =>
    setSpeakers((current) => [
      ...current,
      { id: nextId.current++, name: "", topic: "", type: "speaker" },
    ]);

  const removeSpeaker = (id: number) =>
    setSpeakers((current) => current.filter((speaker) => speaker.id !== id));

  const updateCalling = (id: number, field: keyof Calling, value: string) =>
    setCallings((current) =>
      current.map((calling) =>
        calling.id === id ? { ...calling, [field]: value } : calling,
      ),
    );

  const addCalling = () =>
    setCallings((current) => [
      ...current,
      { id: nextCallingId.current++, type: "release", name: "", position: "" },
    ]);

  const removeCalling = (id: number) =>
    setCallings((current) => current.filter((calling) => calling.id !== id));

  return (
    <form
      action={formAction}
      className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8"
    >
      <div className="mb-8 rounded-xl p-3 text-slate-800">
        <h1 className="text-3xl font-bold tracking-tight">
          Crear reunión sacramental
        </h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-slate-800">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
          </span>
          Ingresa los detalles de la reunión sacramental.
        </p>
      </div>

      {state.message && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <Section title="Información de la reunión" first>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="date" className={labelClass}>
              Fecha
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              aria-describedby="date-error"
              className={`${inputClass} block min-h-[2.75rem] min-w-0 max-w-full appearance-none text-left [&::-webkit-date-and-time-value]:min-h-[1.5em] [&::-webkit-date-and-time-value]:text-left`}
            />
            <FieldError id="date-error" errors={state.errors?.date} />
          </div>

          <div>
            <label htmlFor="meetingType" className={labelClass}>
              Tipo de reunión
            </label>
            <SelectWrapper>
              <select
                id="meetingType"
                name="meetingType"
                required
                aria-describedby="meetingType-error"
                className={`${inputClass} ${selectClass}`}
              >
                <option value="">Selecciona un tipo</option>
                <option value="testimony">De testimonios</option>
                <option value="regular">Regular</option>
                <option value="stake">De estaca</option>
                <option value="general">General</option>
              </select>
            </SelectWrapper>
            <FieldError
              id="meetingType-error"
              errors={state.errors?.meetingType}
            />
          </div>

          <div>
            <label htmlFor="presiding" className={labelClass}>
              Preside
            </label>
            <input
              id="presiding"
              name="presiding"
              type="text"
              required
              aria-describedby="presiding-error"
              placeholder="Nombre de quien preside"
              className={inputClass}
            />
            <FieldError id="presiding-error" errors={state.errors?.presiding} />
          </div>

          <div>
            <label htmlFor="conducting" className={labelClass}>
              Dirige
            </label>
            <input
              id="conducting"
              name="conducting"
              type="text"
              required
              aria-describedby="conducting-error"
              placeholder="Nombre de quien dirige"
              className={inputClass}
            />
            <FieldError
              id="conducting-error"
              errors={state.errors?.conducting}
            />
          </div>
        </div>
      </Section>

      <Section title="Anuncios">
        <label htmlFor="announcements" className="sr-only">
          Anuncios
        </label>
        <textarea
          id="announcements"
          name="announcements"
          aria-describedby="announcements-error"
          rows={3}
          placeholder="Escribe los anuncios..."
          className={`${inputClass} resize-y`}
        />
        <FieldError
          id="announcements-error"
          errors={state.errors?.announcements}
        />
      </Section>

      <Section title="Inicio">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="openingHymnNumber" className={labelClass}>
              Número del himno
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="openingHymnNumber-error"
              placeholder="p. ej., 85"
              className={inputClass}
            />
            <FieldError
              id="openingHymnNumber-error"
              errors={state.errors?.["openingHymn.number"]}
            />
          </div>

          <div>
            <label htmlFor="openingHymnTitle" className={labelClass}>
              Título del himno
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              required
              aria-describedby="openingHymnTitle-error"
              placeholder="Escribe el título del himno"
              className={inputClass}
            />
            <FieldError
              id="openingHymnTitle-error"
              errors={state.errors?.["openingHymn.title"]}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="openingPrayer" className={labelClass}>
              Oración inicial
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              required
              aria-describedby="openingPrayer-error"
              placeholder="Nombre de quien ofrecerá la oración"
              className={inputClass}
            />
            <FieldError
              id="openingPrayer-error"
              errors={state.errors?.openingPrayer}
            />
          </div>
        </div>
      </Section>

      <Section title="Asuntos del barrio">
        <label htmlFor="wardBusiness" className="sr-only">
          Asuntos del barrio
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          aria-describedby="wardBusiness-error"
          rows={3}
          placeholder="Escribe los asuntos del barrio..."
          className={`${inputClass} resize-y`}
        />
        <FieldError
          id="wardBusiness-error"
          errors={state.errors?.wardBusiness}
        />

        <label
          htmlFor="stakeBusiness"
          className="mt-4 flex w-fit cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:scale-105 hover:bg-slate-100"
        >
          <input
            id="stakeBusiness"
            type="checkbox"
            name="stakeBusiness"
            value="true"
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4 rounded border-slate-300 accent-slate-800"
          />
          Asuntos de la estaca
        </label>
        <FieldError
          id="stakeBusiness-error"
          errors={state.errors?.stakeBusiness}
        />
      </Section>

      <Section title="Relevos y llamamientos">
        <div className="flex flex-wrap gap-3">
          {callings.map((calling, index) => (
            <div
              key={calling.id}
              className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition-shadow duration-300 hover:shadow-md sm:rounded-full sm:pl-3"
            >
              <label htmlFor={`callingType-${calling.id}`} className="sr-only">
                Tipo
              </label>
              <SelectWrapper compact className="inline-block">
                <select
                  id={`callingType-${calling.id}`}
                  name="callingType"
                  value={calling.type}
                  onChange={(event) =>
                    updateCalling(calling.id, "type", event.target.value)
                  }
                  className={pillSelectClass}
                >
                  <option value="release">Relevo</option>
                  <option value="calling">Llamamiento</option>
                </select>
              </SelectWrapper>

              <label htmlFor={`callingName-${calling.id}`} className="sr-only">
                Nombre
              </label>
              <input
                id={`callingName-${calling.id}`}
                name="callingName"
                type="text"
                required
                value={calling.name}
                onChange={(event) =>
                  updateCalling(calling.id, "name", event.target.value)
                }
                placeholder="Nombre"
                className={`${pillInputClass} w-40`}
              />

              <label
                htmlFor={`callingPosition-${calling.id}`}
                className="sr-only"
              >
                Llamamiento
              </label>
              <input
                id={`callingPosition-${calling.id}`}
                name="callingPosition"
                type="text"
                required
                value={calling.position}
                onChange={(event) =>
                  updateCalling(calling.id, "position", event.target.value)
                }
                placeholder="Llamamiento"
                className={`${pillInputClass} w-44`}
              />

              <button
                type="button"
                onClick={() => removeCalling(calling.id)}
                aria-label={`Quitar relevo o llamamiento ${index + 1}`}
                className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-all duration-300 hover:scale-110 hover:bg-red-50 hover:text-red-600 active:scale-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <FieldError id="callings-error" errors={state.errors?.callings} />

        <button
          type="button"
          onClick={addCalling}
          className="group mt-5 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:scale-105 hover:border-slate-400 hover:bg-slate-100 hover:shadow-md active:scale-100"
        >
          <span className="text-lg leading-none transition-transform duration-300 group-hover:rotate-90">
            +
          </span>
          Agregar relevo o llamamiento
        </button>
      </Section>

      <Section title="Sacramento">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sacramentHymnNumber" className={labelClass}>
              Número del himno
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="sacramentHymnNumber-error"
              placeholder="p. ej., 85"
              className={inputClass}
            />
            <FieldError
              id="sacramentHymnNumber-error"
              errors={state.errors?.["sacramentHymn.number"]}
            />
          </div>

          <div>
            <label htmlFor="sacramentHymnTitle" className={labelClass}>
              Título del himno
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              required
              aria-describedby="sacramentHymnTitle-error"
              placeholder="Escribe el título del himno"
              className={inputClass}
            />
            <FieldError
              id="sacramentHymnTitle-error"
              errors={state.errors?.["sacramentHymn.title"]}
            />
          </div>
        </div>
      </Section>

      <Section title="Discursantes">
        <div className="space-y-5">
          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition-shadow duration-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold text-slate-700">
                  Discursante {index + 1}
                </h3>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeSpeaker(speaker.id)}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:text-red-600 active:scale-100"
                  >
                    Quitar
                  </button>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`speakerName-${speaker.id}`}
                    className={labelClass}
                  >
                    Nombre
                  </label>
                  <input
                    id={`speakerName-${speaker.id}`}
                    name="speakerName"
                    type="text"
                    required
                    aria-describedby={`speakerName-${speaker.id}-error`}
                    value={speaker.name}
                    onChange={(event) =>
                      updateSpeaker(speaker.id, "name", event.target.value)
                    }
                    placeholder="Nombre del discursante"
                    className={cardInputClass}
                  />
                  <FieldError
                    id={`speakerName-${speaker.id}-error`}
                    errors={state.errors?.[`speakers.${index}.name`]}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`speakerType-${speaker.id}`}
                    className={labelClass}
                  >
                    Tipo
                  </label>
                  <SelectWrapper>
                    <select
                      id={`speakerType-${speaker.id}`}
                      name="speakerType"
                      aria-describedby={`speakerType-${speaker.id}-error`}
                      value={speaker.type}
                      onChange={(event) =>
                        updateSpeaker(speaker.id, "type", event.target.value)
                      }
                      className={`${cardInputClass} ${selectClass}`}
                    >
                      <option value="speaker">Discursante</option>
                      <option value="musical-number">Número musical</option>
                    </select>
                  </SelectWrapper>
                  <FieldError
                    id={`speakerType-${speaker.id}-error`}
                    errors={state.errors?.[`speakers.${index}.type`]}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor={`speakerTopic-${speaker.id}`}
                  className={labelClass}
                >
                  Tema
                </label>
                <input
                  id={`speakerTopic-${speaker.id}`}
                  name="speakerTopic"
                  type="text"
                  required
                  aria-describedby={`speakerTopic-${speaker.id}-error`}
                  value={speaker.topic}
                  onChange={(event) =>
                    updateSpeaker(speaker.id, "topic", event.target.value)
                  }
                  placeholder="Tema del discursante"
                  className={cardInputClass}
                />
                <FieldError
                  id={`speakerTopic-${speaker.id}-error`}
                  errors={state.errors?.[`speakers.${index}.topic`]}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addSpeaker}
          className="group mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:scale-105 hover:border-slate-400 hover:bg-slate-100 hover:shadow-md active:scale-100"
        >
          <span className="text-lg leading-none transition-transform duration-300 group-hover:rotate-90">
            +
          </span>
          Agregar discursante
        </button>
      </Section>

      <Section title="Cierre">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="closingHymnNumber" className={labelClass}>
              Número del himno
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="closingHymnNumber-error"
              placeholder="p. ej., 85"
              className={inputClass}
            />
            <FieldError
              id="closingHymnNumber-error"
              errors={state.errors?.["closingHymn.number"]}
            />
          </div>

          <div>
            <label htmlFor="closingHymnTitle" className={labelClass}>
              Título del himno
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              required
              aria-describedby="closingHymnTitle-error"
              placeholder="Escribe el título del himno"
              className={inputClass}
            />
            <FieldError
              id="closingHymnTitle-error"
              errors={state.errors?.["closingHymn.title"]}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="closingPrayer" className={labelClass}>
              Oración final
            </label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              required
              aria-describedby="closingPrayer-error"
              placeholder="Nombre de quien ofrecerá la oración"
              className={inputClass}
            />
            <FieldError
              id="closingPrayer-error"
              errors={state.errors?.closingPrayer}
            />
          </div>
        </div>
      </Section>

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-700 hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 active:scale-100 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:scale-100 disabled:hover:shadow-md"
        >
          {isPending ? "Creando…" : "Crear reunión"}
          {!isPending && (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
