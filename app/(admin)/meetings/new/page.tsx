import type { Metadata } from "next";
import CreateMeetingForm from "@/components/meetings/CreateMeetingForm";

export const metadata: Metadata = {
  title: "Crear reunión",
  description:
    "Crea un plan para una reunión sacramental con discursantes, himnos, anuncios y otros detalles.",
};

export default function Page() {
  return <CreateMeetingForm />;
}
