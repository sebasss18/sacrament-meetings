"use server";

import { MeetingFormSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createMeeting as createMeetingDb,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
} from "@/lib/meetings-db";

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
};

function getAnnouncements(formData: FormData): string[] {
  return formData.getAll("announcements").flatMap((value) =>
    String(value)
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

export async function createMeeting(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
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
    const errors: Record<string, string[]> = {};

    validation.error.issues.forEach((issue) => {
      const path = issue.path.join(".");

      if (!errors[path]) {
        errors[path] = [];
      }

      errors[path].push(issue.message);
    });

    return {
      message: "Please correct the errors in the form.",
      errors,
    };
  }

  try {
    await createMeetingDb(validation.data);
  } catch {
    return {
      message: "There was a problem creating the meeting. Please try again.",
      errors: {},
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
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
    announcements: getAnnouncements(formData),

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
    const errors: Record<string, string[]> = {};

    validation.error.issues.forEach((issue) => {
      const path = issue.path.join(".");

      if (!errors[path]) {
        errors[path] = [];
      }

      errors[path].push(issue.message);
    });

    return {
      message: "Please correct the errors in the form.",
      errors,
    };
  }

  try {
    await updateMeetingDb(id, validation.data);
  } catch {
    return {
      message: "There was a problem updating the meeting. Please try again.",
      errors: {},
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(id: number): Promise<FormState> {
  try {
    await deleteMeetingDb(id);
  } catch {
    return {
      message: "Could not delete the meeting. Please try again.",
      errors: {},
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
  return { message: "" };
}
