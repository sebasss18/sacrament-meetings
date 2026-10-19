import { z } from "zod";

export const HymnSchema = z.object({
  number: z.number(),
  title: z.string().min(1, "El título del himno es obligatorio."),
});

export const SpeakerItemSchema = z.object({
  name: z.string().min(1, "El nombre del discursante es obligatorio."),
  topic: z.string().min(1, "El tema del discursante es obligatorio."),
  type: z.enum(["speaker", "musical-number"], {
    error: "Selecciona un tipo válido.",
  }),
});

export const WardBusinessItemSchema = z.object({
  description: z.string().min(1, "La descripción es obligatoria."),
});

export const MeetingFormSchema = z.object({
  date: z.string().min(1, "La fecha es obligatoria."),

  meetingType: z.enum(["testimony", "regular", "stake", "general"], {
    error: "Selecciona un tipo de reunión válido.",
  }),

  presiding: z.string().min(1, "La persona que preside es obligatoria."),

  conducting: z.string().min(1, "La persona que dirige es obligatoria."),

  announcements: z.array(z.string()).optional(),

  openingHymn: HymnSchema,

  openingPrayer: z.string().min(1, "La oración inicial es obligatoria."),

  wardBusiness: z.array(WardBusinessItemSchema),

  stakeBusiness: z.boolean(),

  sacramentHymn: HymnSchema,

  speakers: z.array(SpeakerItemSchema),

  closingHymn: HymnSchema,

  closingPrayer: z.string().min(1, "La oración final es obligatoria."),
});
