"use client";

import { useActionState, useState } from "react";
import { createMeeting, type FormState } from "@/lib/actions";

const initialState: FormState = {
  message: "",
  errors: {},
};

export default function CreateMeetingForm() {
  const [speakers, setSpeakers] = useState([
    {
      name: "",
      topic: "",
      type: "speaker",
    },
  ]);

  const [state, formAction, isPending] = useActionState(
    createMeeting,
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
          Create Sacrament Meeting
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter the details for the sacrament meeting.
        </p>
      </div>

      {/* Meeting Information */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Meeting Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
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
              Meeting Type
            </label>
            <select
              id="meetingType"
              name="meetingType"
              required
              aria-describedby="meetingType-error"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select a type</option>
              <option value="testimony">Testimony</option>
              <option value="regular">Regular</option>
              <option value="stake">Stake</option>
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
              Presiding
            </label>
            <input
              id="presiding"
              name="presiding"
              type="text"
              required
              aria-describedby="presiding-error"
              placeholder="Presiding member"
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
              Conducting
            </label>
            <input
              id="conducting"
              name="conducting"
              type="text"
              required
              aria-describedby="conducting-error"
              placeholder="Conducting member"
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
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Announcements
        </h2>

        <textarea
          id="announcements"
          name="announcements"
          aria-describedby="announcements-error"
          rows={3}
          placeholder="Enter announcements..."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
        />
        <label htmlFor="announcements" className="sr-only">
          Announcements
        </label>
        <div id="announcements-error" aria-live="polite">
          {state.errors?.announcements?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </section>

      {/* Opening */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Opening</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Hymn Number
            </label>

            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="openingHymnNumber-error"
              placeholder="e.g. 85"
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
              Hymn Title
            </label>

            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              required
              aria-describedby="openingHymnTitle-error"
              placeholder="e.g. How Firm a Foundation"
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
              Opening Prayer
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              required
              aria-describedby="openingPrayer-error"
              placeholder="Person giving the prayer"
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
          Ward Business
        </h2>

        <label htmlFor="wardBusiness" className="sr-only">
          Ward Business
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          aria-describedby="wardBusiness-error"
          rows={3}
          placeholder="Enter ward business..."
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
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-300"
          />
          Stake business
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
              Hymn Number
            </label>

            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="sacramentHymnNumber-error"
              placeholder="e.g. 85"
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
              Hymn Title
            </label>

            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              required
              aria-describedby="sacramentHymnTitle-error"
              placeholder="e.g. How Firm a Foundation"
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
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Speakers</h2>

        <div className="space-y-5">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-700">
                  Speaker {index + 1}
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
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`speakerName-${index}`}
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Name
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
                    placeholder="Speaker name"
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
                    className="mb-2 block text-sm font-medium text-slate-700 py-1"
                  >
                    Type
                  </label>
                  <select
                    id={`speakerType-${index}`}
                    name="speakerType"
                    aria-describedby={`speakerType-${index}-error`}
                    value={speaker.type}
                    onChange={(event) => {
                      const updatedSpeakers = [...speakers];
                      updatedSpeakers[index].type = event.target.value;
                      setSpeakers(updatedSpeakers);
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical Number</option>
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
                  Topic
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
                  placeholder="Speaker topic"
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
          Add Speaker
        </button>
      </section>

      {/* Closing */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Closing</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Hymn Number
            </label>

            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="closingHymnNumber-error"
              placeholder="e.g. 85"
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
              Hymn Title
            </label>

            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              required
              aria-describedby="closingHymnTitle-error"
              placeholder="e.g. How Firm a Foundation"
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
              Closing Prayer
            </label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              required
              aria-describedby="closingPrayer-error"
              placeholder="Person giving the prayer"
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
          {isPending ? "Creating..." : "Create Meeting"}
        </button>
      </div>
    </form>
  );
}
