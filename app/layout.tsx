import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter, Libre_Baskerville } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacrament Meetings",
  description:
    "Plan and explore Sacrament Meetings with detail.",
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
