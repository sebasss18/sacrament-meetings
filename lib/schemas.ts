import { z } from "zod";

export const HymnSchema = z.object({
  number: z.number(),
  title: z.string().min(1, "Hymn title is required"),
});

export const SpeakerItemSchema = z.object({
  name: z.string().min(1, "Speaker name is required"),
  topic: z.string().min(1, "Speaker topic is required"),
  type: z.enum(["speaker", "musical-number"]),
});

export const WardBusinessItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export const MeetingFormSchema = z.object({
  date: z.string().min(1, "Date is required"),

  meetingType: z.enum(["testimony", "regular", "stake", "general"]),

  presiding: z.string().min(1, "Presiding is required"),

  conducting: z.string().min(1, "Conducting is required"),

  announcements: z.array(z.string()).optional(),

  openingHymn: HymnSchema,

  openingPrayer: z.string().min(1, "Opening prayer is required"),

  wardBusiness: z.array(WardBusinessItemSchema),

  stakeBusiness: z.boolean(),

  sacramentHymn: HymnSchema,

  speakers: z.array(SpeakerItemSchema),

  closingHymn: HymnSchema,

  closingPrayer: z.string().min(1, "Closing prayer is required"),
});
