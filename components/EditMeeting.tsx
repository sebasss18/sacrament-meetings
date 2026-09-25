"use client";

import { useState } from "react";
import { updateMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface EditMeetingProps {
  meeting: SacramentMeeting;
}

export default function EditMeeting({ meeting }: EditMeetingProps) {
  const [speakers, setSpeakers] = useState(meeting.speakers);

  return (
    <form
      action={updateMeeting.bind(null, meeting.id)}
      className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-xl ring-1 ring-slate-200"
    >
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Edit Sacrament Meeting
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Update the details for the sacrament meeting.
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
              defaultValue={meeting.date}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
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
              defaultValue={meeting.meetingType}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select a type</option>
              <option value="testimony">Testimony</option>
              <option value="regular">Regular</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
            </select>
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
              defaultValue={meeting.presiding}
              placeholder="Presiding member"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
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
              defaultValue={meeting.conducting}
              placeholder="Conducting member"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Announcements
        </h2>

        <textarea
          name="announcements"
          rows={3}
          defaultValue={(meeting.announcements ?? []).join("\n")}
          placeholder="Enter announcements..."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
        />
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
              defaultValue={meeting.openingHymn.number}
              placeholder="e.g. 85"
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
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
              defaultValue={meeting.openingHymn.title}
              placeholder="e.g. How Firm a Foundation"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
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
              defaultValue={meeting.openingPrayer}
              placeholder="Person giving the prayer"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
      </section>

      {/* Ward Business */}
      <section className="mb-8 border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Ward Business
        </h2>

        <textarea
          name="wardBusiness"
          rows={3}
          defaultValue={meeting.wardBusiness
            .map((business) => business.description)
            .join("\n")}
          placeholder="Enter ward business..."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
        />

        <label className="mt-4 flex items-center gap-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="stakeBusiness"
            value="true"
            defaultChecked={meeting.stakeBusiness}
            className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-300"
          />
          Stake business
        </label>
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
              defaultValue={meeting.sacramentHymn.number}
              placeholder="e.g. 85"
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
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
              defaultValue={meeting.sacramentHymn.title}
              placeholder="e.g. How Firm a Foundation"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
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
                    value={speaker.name}
                    onChange={(event) => {
                      const updatedSpeakers = [...speakers];
                      updatedSpeakers[index].name = event.target.value;
                      setSpeakers(updatedSpeakers);
                    }}
                    placeholder="Speaker name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`speakerType-${index}`}
                    className="mb-2 block py-1 text-sm font-medium text-slate-700"
                  >
                    Type
                  </label>

                  <select
                    id={`speakerType-${index}`}
                    name="speakerType"
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
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical Number</option>
                  </select>
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
                  value={speaker.topic}
                  onChange={(event) => {
                    const updatedSpeakers = [...speakers];
                    updatedSpeakers[index].topic = event.target.value;
                    setSpeakers(updatedSpeakers);
                  }}
                  placeholder="Speaker topic"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                />
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
              defaultValue={meeting.closingHymn.number}
              placeholder="e.g. 85"
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
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
              defaultValue={meeting.closingHymn.title}
              placeholder="e.g. How Firm a Foundation"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
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
              defaultValue={meeting.closingPrayer}
              placeholder="Person giving the prayer"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="submit"
          className="rounded-full bg-slate-800 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          Update Meeting
        </button>
      </div>
    </form>
  );
}
