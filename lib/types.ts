export type MeetingType = "testimony" | "regular" | "stake" | "general";

export interface Hymn {
  number: number;
  title: string;
}

export interface SpeakerItem {
  name: string;
  topic: string;
  type: "speaker" | "musical-number";
}

export interface WardBusinessItem {
  description: string;
}

export interface CallingItem {
  type: "release" | "calling";
  name: string;
  position: string;
}

export interface SacramentMeeting {
  id: number;
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  callings: CallingItem[];
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}

export type HomeMeetingPreview = Pick<
  SacramentMeeting,
  | "date"
  | "openingHymn"
  | "wardBusiness"
  | "stakeBusiness"
  | "sacramentHymn"
  | "speakers"
  | "closingHymn"
>;
