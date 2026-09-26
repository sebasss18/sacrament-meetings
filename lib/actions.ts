"use server";

import { MeetingFormSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createMeeting as createMeetingDb,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
} from "@/lib/meetings-db";

export async function createMeeting(formData: FormData): Promise<void> {
  const speakerNames = formData.getAll("speakerName").map(String);
  const speakerTopics = formData.getAll("speakerTopic").map(String);
  const speakerTypes = formData.getAll("speakerType").map(String);

  const speakers = speakerNames.map((name, index) => ({
    name,
    topic: speakerTopics[index],
    type: speakerTypes[index] as "speaker" | "musical-number",
  }));

  const data = {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.getAll("announcements").map(String),

    openingHymn: {
      number: Number(formData.get("openingHymnNumber")),
      title: String(formData.get("openingHymnTitle")),
    },

    openingPrayer: formData.get("openingPrayer"),

    wardBusiness: String(formData.get("wardBusiness") || "")
      .split("\n")
      .map((description) => ({
        description: description.trim(),
      }))
      .filter((item) => item.description),

    stakeBusiness: formData.get("stakeBusiness") === "true",

    sacramentHymn: {
      number: Number(formData.get("sacramentHymnNumber")),
      title: String(formData.get("sacramentHymnTitle")),
    },

    speakers,

    closingHymn: {
      number: Number(formData.get("closingHymnNumber")),
      title: String(formData.get("closingHymnTitle")),
    },

    closingPrayer: formData.get("closingPrayer"),
  };

  const validation = MeetingFormSchema.safeParse(data);

  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  await createMeetingDb(validation.data);

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  formData: FormData,
): Promise<void> {
  const speakerNames = formData.getAll("speakerName").map(String);
  const speakerTopics = formData.getAll("speakerTopic").map(String);
  const speakerTypes = formData.getAll("speakerType").map(String);

  const speakers = speakerNames.map((name, index) => ({
    name,
    topic: speakerTopics[index],
    type: speakerTypes[index] as "speaker" | "musical-number",
  }));

  const data = {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.getAll("announcements").map(String),

    openingHymn: {
      number: Number(formData.get("openingHymnNumber")),
      title: String(formData.get("openingHymnTitle")),
    },

    openingPrayer: formData.get("openingPrayer"),

    wardBusiness: String(formData.get("wardBusiness") || "")
      .split("\n")
      .map((description) => ({
        description: description.trim(),
      }))
      .filter((item) => item.description),

    stakeBusiness: formData.get("stakeBusiness") === "true",

    sacramentHymn: {
      number: Number(formData.get("sacramentHymnNumber")),
      title: String(formData.get("sacramentHymnTitle")),
    },

    speakers,

    closingHymn: {
      number: Number(formData.get("closingHymnNumber")),
      title: String(formData.get("closingHymnTitle")),
    },

    closingPrayer: formData.get("closingPrayer"),
  };

  const validation = MeetingFormSchema.safeParse(data);

  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  await updateMeetingDb(id, validation.data);

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(id: number): Promise<void> {
  await deleteMeetingDb(id);

  revalidatePath("/meetings");
  redirect("/meetings");
}
