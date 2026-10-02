import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter, Libre_Baskerville } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Sacrament Meetings",
    template: "%s | Sacrament Meetings",
  },
  description:
    "Plan and explore Sacrament Meetings with detailed speaker, hymn, and announcement information.",
  openGraph: {
    title: "Sacrament Meetings",
    description:
      "Plan and explore Sacrament Meetings with detailed speaker, hymn, and announcement information.",
    siteName: "Sacrament Meetings",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sacrament Meetings planner cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacrament Meetings",
    description:
      "Plan and explore Sacrament Meetings with detailed speaker, hymn, and announcement information.",
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
    <html lang="en">
      <body className={`${inter.variable} ${libreBaskerville.variable}`}>
        <Header />
        <main className="mx-auto min-h-screen max-w-6xl p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
