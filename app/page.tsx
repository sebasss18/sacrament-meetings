import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WardNameForm from "@/components/ward/WardNameForm";
import RevealText from "@/components/animation/RevealText";
import Reveal from "@/components/animation/Reveal";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Bienvenido al planificador de reuniones sacramentales para consultar las próximas reuniones y administrar los detalles del barrio.",
};

export default function Home() {
  return (
    <main className="relative -mt-2 flex flex-1 flex-col bg-slate-950 before:pointer-events-none before:absolute before:inset-x-0 before:-top-32 before:h-32 before:bg-slate-950 before:content-['']">
      <section className="relative isolate flex min-h-[calc(100dvh-80px)] w-full flex-1 items-center overflow-hidden bg-slate-950">
        <Image
          src="/temple-hero-image.jpeg"
          alt="Templo de Salt Lake City"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-slate-950" />

        <div className="relative z-10 w-full px-6 py-20 sm:px-12 md:px-16 lg:px-20">
          <div className="max-w-3xl">
            <Reveal className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 [animation-duration:1.5s]" />
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-100 opacity-50 [animation-duration:1.5s] [animation-delay:0.6s]" />
                <span className="relative inline-flex h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
              </span>
              Planificación y organización
            </Reveal>

            <h1 className="max-w-3xl text-4xl leading-[1.12] font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <RevealText as="span" className="block">
                Cada reunión,
              </RevealText>
              <RevealText
                as="span"
                delay={200}
                className="mt-2 block font-serif font-normal italic text-slate-300"
              >
                mejor preparada.
              </RevealText>
            </h1>

            <RevealText
              as="p"
              delay={450}
              className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
            >
              Organiza las reuniones sacramentales.
            </RevealText>

            <RevealText
              as="p"
              delay={600}
              className="mt-1 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
            >
              Administra discursantes, himnos, asignaciones y anuncios con
              claridad y sencillez.
            </RevealText>

            <Reveal
              delay={800}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/meetings"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-semibold text-slate-900 shadow-xl shadow-black/10 outline-none transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-white/60 motion-reduce:transform-none"
              >
                Ver reuniones
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>

              <Link
                href="/meetings/new"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-semibold text-white shadow-lg backdrop-blur-md outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20 hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.35)] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/15 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[400%] motion-reduce:hidden"
                />
                <span
                  aria-hidden="true"
                  className="relative inline-flex size-6 items-center justify-center text-xl leading-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90 group-focus-visible:rotate-90 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-focus-visible:rotate-0"
                >
                  +
                </span>
                <span className="relative">Crear reunión</span>
              </Link>
            </Reveal>

            <Reveal delay={800}>
              <WardNameForm />
            </Reveal>

            <Reveal
              delay={900}
              className="mt-14 flex items-center gap-4 border-t border-white/15 pt-6 text-sm text-slate-300 sm:mt-16"
            >
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-700 text-xs">
                  L
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-600 text-xs">
                  D
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-500 text-xs">
                  S
                </span>
              </div>

              <p className="max-w-xs leading-6">
                Todo lo necesario para preparar cada reunión con anticipación.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
