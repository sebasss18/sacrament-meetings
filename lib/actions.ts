// Server actions for authentication, account settings, and meetings.
"use server";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import {
  AccountEmailSchema,
  AccountPasswordSchema,
  MeetingFormSchema,
} from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getUserByEmail,
  getUserById,
  updateUserEmail,
  updateUserPassword,
} from "@/lib/data";
import {
  createMeeting as createMeetingDb,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
} from "@/lib/meetings-db";

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
};

export type AccountActionState = {
  status: "error" | "success" | "idle";
  message: string;
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

async function requireAdminSession() {
  const session = await auth();

  if (session?.user?.isAdmin !== true) {
    redirect("/login");
  }
}

async function requireAdminAccount() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  if (
    session?.user?.isAdmin !== true ||
    !Number.isSafeInteger(userId) ||
    userId < 1
  ) {
    redirect("/login");
  }

  const user = await getUserById(userId);

  if (!user) {
    redirect("/login");
  }

  return user;
}

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

export async function updateAccountEmail(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const user = await requireAdminAccount();
  const validation = AccountEmailSchema.safeParse({
    email: formData.get("email"),
    currentPassword: String(formData.get("currentPassword") ?? ""),
  });

  if (!validation.success) {
    return {
      status: "error",
      message: validation.error.issues[0]?.message ?? "Revisa los datos.",
    };
  }

  const passwordsMatch = await bcrypt.compare(
    validation.data.currentPassword,
    user.password,
  );

  if (!passwordsMatch) {
    return {
      status: "error",
      message: "La contraseña actual no es correcta.",
    };
  }

  if (validation.data.email === user.email.toLowerCase()) {
    return { status: "success", message: "Ese ya es el correo de tu cuenta." };
  }

  const existingUser = await getUserByEmail(validation.data.email);

  if (existingUser && existingUser.id !== user.id) {
    return {
      status: "error",
      message: "Ese correo ya está registrado.",
    };
  }

  try {
    await updateUserEmail(user.id, validation.data.email);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return {
        status: "error",
        message: "Ese correo ya está registrado.",
      };
    }

    throw error;
  }

  revalidatePath("/account");
  return { status: "success", message: "Correo actualizado." };
}

export async function updateAccountPassword(
  _previousState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const user = await requireAdminAccount();
  const validation = AccountPasswordSchema.safeParse({
    currentPassword: String(formData.get("currentPassword") ?? ""),
    newPassword: String(formData.get("newPassword") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  });

  if (!validation.success) {
    return {
      status: "error",
      message: validation.error.issues[0]?.message ?? "Revisa los datos.",
    };
  }

  const passwordsMatch = await bcrypt.compare(
    validation.data.currentPassword,
    user.password,
  );

  if (!passwordsMatch) {
    return {
      status: "error",
      message: "La contraseña actual no es correcta.",
    };
  }

  const passwordHash = await bcrypt.hash(validation.data.newPassword, 12);
  await updateUserPassword(user.id, passwordHash);
  revalidatePath("/account");

  return { status: "success", message: "Contraseña actualizada." };
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

function getCallings(formData: FormData) {
  const callingTypes = formData.getAll("callingType").map(String);
  const callingNames = formData.getAll("callingName").map(String);
  const callingPositions = formData.getAll("callingPosition").map(String);

  return callingNames.map((name, index) => ({
    type: callingTypes[index] as "release" | "calling",
    name,
    position: callingPositions[index] ?? "",
  }));
}

function getSpeakers(formData: FormData) {
  const speakerNames = formData.getAll("speakerName").map(String);
  const speakerTopics = formData.getAll("speakerTopic").map(String);
  const speakerTypes = formData.getAll("speakerType").map(String);

  return speakerNames.map((name, index) => ({
    name,
    topic: speakerTopics[index],
    type: speakerTypes[index] as "speaker" | "musical-number",
  }));
}

function getMeetingData(formData: FormData) {
  return {
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

    callings: getCallings(formData),

    sacramentHymn: {
      number: Number(formData.get("sacramentHymnNumber")),
      title: String(formData.get("sacramentHymnTitle")),
    },

    speakers: getSpeakers(formData),

    closingHymn: {
      number: Number(formData.get("closingHymnNumber")),
      title: String(formData.get("closingHymnTitle")),
    },

    closingPrayer: formData.get("closingPrayer"),
  };
}

function validateMeeting(formData: FormData) {
  const validation = MeetingFormSchema.safeParse(getMeetingData(formData));

  if (validation.success) {
    return { success: true as const, data: validation.data };
  }

  const errors: Record<string, string[]> = {};

  validation.error.issues.forEach((issue) => {
    const path = issue.path.join(".");

    if (!errors[path]) {
      errors[path] = [];
    }

    errors[path].push(issue.message);
  });

  return {
    success: false as const,
    state: {
      message: "Corrige los errores del formulario.",
      errors,
    } satisfies FormState,
  };
}

export async function createMeeting(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  await requireAdminSession();

  const result = validateMeeting(formData);

  if (!result.success) {
    return result.state;
  }

  try {
    await createMeetingDb(result.data);
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
  await requireAdminSession();

  const result = validateMeeting(formData);

  if (!result.success) {
    return result.state;
  }

  try {
    await updateMeetingDb(id, result.data);
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
  await requireAdminSession();

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
