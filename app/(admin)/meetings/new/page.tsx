import type { Metadata } from "next";
import CreateMeetingForm from "@/components/CreateMeetingForm";

export const metadata: Metadata = {
  title: "Create Meeting",
  description:
    "Create a new sacrament meeting plan with speakers, hymns, announcements, and supporting details.",
};

export default function Page() {
  return <CreateMeetingForm />;
}
