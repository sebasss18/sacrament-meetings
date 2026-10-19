import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import { Inter, Libre_Baskerville } from "next/font/google";
import type { Metadata } from "next";

const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_ENV === "production" &&
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Reuniones sacramentales",
    template: "%s | Reuniones sacramentales",
  },
  description:
    "Planifica y consulta reuniones sacramentales con información detallada sobre discursantes, himnos y anuncios.",
  openGraph: {
    title: "Reuniones sacramentales",
    description:
      "Planifica y consulta reuniones sacramentales con información detallada sobre discursantes, himnos y anuncios.",
    siteName: "Reuniones sacramentales",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1280,
        height: 1029,
        alt: "Portada del planificador de reuniones sacramentales",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reuniones sacramentales",
    description:
      "Planifica y consulta reuniones sacramentales con información detallada sobre discursantes, himnos y anuncios.",
    images: ["/opengraph-image"],
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${libreBaskerville.variable} flex min-h-screen flex-col`}
      >
        <Header />

        <PageContainer>{children}</PageContainer>

        <Footer />
      </body>
    </html>
  );
}
