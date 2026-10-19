import type { MeetingType, SpeakerItem } from "./types";

export const meetingTypeLabels: Record<MeetingType, string> = {
  testimony: "Reunión de testimonios",
  regular: "Reunión regular",
  stake: "Reunión de estaca",
  general: "Reunión general",
};

export const speakerTypeLabels: Record<SpeakerItem["type"], string> = {
  speaker: "discursante",
  "musical-number": "número musical",
};
