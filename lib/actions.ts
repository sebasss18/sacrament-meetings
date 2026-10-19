"use server";

import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
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

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/meetings",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type === "CredentialsSignin"
        ? "El correo electrónico o la contraseña no son válidos."
        : "Ocurrió un error. Inténtalo de nuevo.";
    }

    throw error;
  }
}

async function requireOwnerSession() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

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
  await requireOwnerSession();

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
      message: "Corrige los errores del formulario.",
      errors,
    };
  }

  try {
    await createMeetingDb(validation.data);
  } catch {
    return {
      message: "No se pudo crear la reunión. Inténtalo de nuevo.",
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
  await requireOwnerSession();

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
      message: "Corrige los errores del formulario.",
      errors,
    };
  }

  try {
    await updateMeetingDb(id, validation.data);
  } catch {
    return {
      message: "No se pudo actualizar la reunión. Inténtalo de nuevo.",
      errors: {},
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(id: number): Promise<FormState> {
  await requireOwnerSession();

  try {
    await deleteMeetingDb(id);
  } catch {
    return {
      message: "No se pudo eliminar la reunión. Inténtalo de nuevo.",
      errors: {},
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
  return { message: "" };
}
