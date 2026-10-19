"use client";

import { useActionState, useState } from "react";
import { updateMeeting, type FormState } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface EditMeetingProps {
  meeting: SacramentMeeting;
}

const initialState: FormState = {
  message: "",
  errors: {},
};

export default function EditMeeting({ meeting }: EditMeetingProps) {
  const [speakers, setSpeakers] = useState(meeting.speakers);

  const [state, formAction, isPending] = useActionState(
    updateMeeting.bind(null, meeting.id),
    initialState,
  );

  return (
    <form
      action={formAction}
      className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-xl ring-1 ring-slate-200"
    >
      {state.message && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Editar reunión sacramental
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Actualiza los detalles de la reunión sacramental.
        </p>
      </div>

      {/* Meeting Information */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Información de la reunión
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Fecha
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={meeting.date}
              aria-describedby="date-error"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="date-error" aria-live="polite">
              {state.errors?.date?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="meetingType"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tipo de reunión
            </label>
            <select
              id="meetingType"
              name="meetingType"
              required
              defaultValue={meeting.meetingType}
              aria-describedby="meetingType-error"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Selecciona un tipo</option>
              <option value="testimony">De testimonios</option>
              <option value="regular">Regular</option>
              <option value="stake">De estaca</option>
              <option value="general">General</option>
            </select>
            <div id="meetingType-error" aria-live="polite">
              {state.errors?.meetingType?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="presiding"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Preside
            </label>
            <input
              id="presiding"
              name="presiding"
              type="text"
              required
              defaultValue={meeting.presiding}
              aria-describedby="presiding-error"
              placeholder="Nombre de quien preside"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="presiding-error" aria-live="polite">
              {state.errors?.presiding?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="conducting"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Dirige
            </label>
            <input
              id="conducting"
              name="conducting"
              type="text"
              required
              defaultValue={meeting.conducting}
              aria-describedby="conducting-error"
              placeholder="Nombre de quien dirige"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="conducting-error" aria-live="polite">
              {state.errors?.conducting?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Anuncios</h2>

        <label htmlFor="announcements" className="sr-only">
          Anuncios
        </label>
        <textarea
          id="announcements"
          name="announcements"
          aria-describedby="announcements-error"
          rows={3}
          defaultValue={(meeting.announcements ?? []).join("\n")}
          placeholder="Escribe los anuncios..."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
        />
        <div id="announcements-error" aria-live="polite">
          {state.errors?.announcements?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </section>

      {/* Opening */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Inicio</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Número del himno
            </label>

            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting.openingHymn.number}
              aria-describedby="openingHymnNumber-error"
              placeholder="p. ej., 85"
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="openingHymnNumber-error" aria-live="polite">
              {state.errors?.["openingHymn.number"]?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Título del himno
            </label>

            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              required
              defaultValue={meeting.openingHymn.title}
              aria-describedby="openingHymnTitle-error"
              placeholder="Escribe el título del himno"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="openingHymnTitle-error" aria-live="polite">
              {state.errors?.["openingHymn.title"]?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="openingPrayer"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Oración inicial
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              required
              defaultValue={meeting.openingPrayer}
              aria-describedby="openingPrayer-error"
              placeholder="Nombre de quien ofrecerá la oración"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="openingPrayer-error" aria-live="polite">
              {state.errors?.openingPrayer?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ward Business */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Asuntos del barrio
        </h2>

        <label htmlFor="wardBusiness" className="sr-only">
          Asuntos del barrio
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          aria-describedby="wardBusiness-error"
          rows={3}
          defaultValue={meeting.wardBusiness
            .map((business) => business.description)
            .join("\n")}
          placeholder="Escribe los asuntos del barrio..."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
        />
        <div id="wardBusiness-error" aria-live="polite">
          {state.errors?.wardBusiness?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>

        <label
          htmlFor="stakeBusiness"
          className="mt-4 flex items-center gap-3 text-sm font-medium text-slate-700"
        >
          <input
            id="stakeBusiness"
            type="checkbox"
            name="stakeBusiness"
            value="true"
            defaultChecked={meeting.stakeBusiness}
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-300"
          />
          Asuntos de la estaca
        </label>
        <div id="stakeBusiness-error" aria-live="polite">
          {state.errors?.stakeBusiness?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </section>

      {/* Sacrament */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Sacrament</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Número del himno
            </label>

            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting.sacramentHymn.number}
              aria-describedby="sacramentHymnNumber-error"
              placeholder="p. ej., 85"
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="sacramentHymnNumber-error" aria-live="polite">
              {state.errors?.["sacramentHymn.number"]?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Título del himno
            </label>

            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              required
              defaultValue={meeting.sacramentHymn.title}
              aria-describedby="sacramentHymnTitle-error"
              placeholder="Escribe el título del himno"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="sacramentHymnTitle-error" aria-live="polite">
              {state.errors?.["sacramentHymn.title"]?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Discursantes
        </h2>

        <div className="space-y-5">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-700">
                  Discursante {index + 1}
                </h3>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSpeakers(
                        speakers.filter(
                          (_, speakerIndex) => speakerIndex !== index,
                        ),
                      )
                    }
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    Quitar
                  </button>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`speakerName-${index}`}
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Nombre
                  </label>

                  <input
                    id={`speakerName-${index}`}
                    name="speakerName"
                    type="text"
                    required
                    aria-describedby={`speakerName-${index}-error`}
                    value={speaker.name}
                    onChange={(event) => {
                      const updatedSpeakers = [...speakers];
                      updatedSpeakers[index].name = event.target.value;
                      setSpeakers(updatedSpeakers);
                    }}
                    placeholder="Nombre del discursante"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                  />
                  <div id={`speakerName-${index}-error`} aria-live="polite">
                    {state.errors?.[`speakers.${index}.name`]?.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`speakerType-${index}`}
                    className="mb-2 block py-1 text-sm font-medium text-slate-700"
                  >
                    Tipo
                  </label>

                  <select
                    id={`speakerType-${index}`}
                    name="speakerType"
                    aria-describedby={`speakerType-${index}-error`}
                    value={speaker.type}
                    onChange={(event) => {
                      const updatedSpeakers = [...speakers];
                      const newType = event.target.value as
                        | "speaker"
                        | "musical-number";
                      updatedSpeakers[index].type = newType;
                      setSpeakers(updatedSpeakers);
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="speaker">Discursante</option>
                    <option value="musical-number">Número musical</option>
                  </select>
                  <div id={`speakerType-${index}-error`} aria-live="polite">
                    {state.errors?.[`speakers.${index}.type`]?.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor={`speakerTopic-${index}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Tema
                </label>

                <input
                  id={`speakerTopic-${index}`}
                  name="speakerTopic"
                  type="text"
                  required
                  aria-describedby={`speakerTopic-${index}-error`}
                  value={speaker.topic}
                  onChange={(event) => {
                    const updatedSpeakers = [...speakers];
                    updatedSpeakers[index].topic = event.target.value;
                    setSpeakers(updatedSpeakers);
                  }}
                  placeholder="Tema del discursante"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                />
                <div id={`speakerTopic-${index}-error`} aria-live="polite">
                  {state.errors?.[`speakers.${index}.topic`]?.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setSpeakers([
              ...speakers,
              {
                name: "",
                topic: "",
                type: "speaker",
              },
            ])
          }
          className="mt-5 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Agregar discursante
        </button>
      </section>

      {/* Closing */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Cierre</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Número del himno
            </label>

            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting.closingHymn.number}
              aria-describedby="closingHymnNumber-error"
              placeholder="p. ej., 85"
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="closingHymnNumber-error" aria-live="polite">
              {state.errors?.["closingHymn.number"]?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Título del himno
            </label>

            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              required
              defaultValue={meeting.closingHymn.title}
              aria-describedby="closingHymnTitle-error"
              placeholder="Escribe el título del himno"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="closingHymnTitle-error" aria-live="polite">
              {state.errors?.["closingHymn.title"]?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="closingPrayer"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Oración final
            </label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              required
              defaultValue={meeting.closingPrayer}
              aria-describedby="closingPrayer-error"
              placeholder="Nombre de quien ofrecerá la oración"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
            <div id="closingPrayer-error" aria-live="polite">
              {state.errors?.closingPrayer?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-slate-800 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          {isPending ? "Actualizando…" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
