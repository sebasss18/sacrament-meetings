import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1">
      <section className="relative min-h-[600px] w-full overflow-hidden rounded-xl">
        <Image
          src="/temple-hero-image.jpeg"
          alt="Salt Lake City Temple"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full min-h-[600px] flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight">
            Sacrament Meeting Planner
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-8">
            View and manage upcoming sacrament meetings, speakers, hymns,
            announcements, and ward business.
          </p>

          <Link
            href="/meetings"
            className="rounded-full bg-[#17365d] px-6 py-3 font-semibold transition duration-300 hover:scale-105 hover:bg-[#244d7c]"
          >
            View Meetings
          </Link>
        </div>
      </section>
    </main>
  );
}
