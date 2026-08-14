import Link from "next/link";
import Image from "next/image";
import { CalendarIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section id="top" className="bg-navy">
      <div className="mx-auto grid max-w-content grid-cols-1 items-start gap-10 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:px-14 lg:pb-[120px] lg:pt-[72px] xl:px-[72px]">
        {/* Copy */}
        <div className="lg:pt-5">
          <h1 className="mb-[26px] text-h1 font-bold [text-wrap:pretty]">
            <span className="text-cyan">Racing and rafts, barrel-rolling and bingo.</span>{" "}
            <span className="text-white">Fireworks, fancy dress and fun for all the family.</span>
          </h1>

          <div className="flex flex-col gap-3 text-body">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-cyan">
                <CalendarIcon />
              </span>
              <span>
                <strong className="font-bold">Beer Regatta 2026:</strong> Sat 8th – Fri 14th August
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-cyan">
                <CalendarIcon />
              </span>
              <span>
                <strong className="font-bold">Regatta Day 2026:</strong> Thursday 13th August
              </span>
            </div>
          </div>

          <Link
            href="/#events"
            className="mt-[30px] block w-full bg-cyan px-[30px] py-[14px] text-center font-sans text-body font-bold text-white transition-colors duration-150 hover:bg-cyan-hover sm:inline-block sm:w-auto"
          >
            View Programme
          </Link>
        </div>

        {/* Image — bleeds off the right edge on desktop, full-bleed on mobile */}
        <div className="relative -mx-5 h-[260px] sm:-mx-8 sm:h-[340px] lg:mx-0 lg:mr-[-72px] lg:h-[520px]">
          <Image
            src="/images/hero.jpg"
            alt="Teams racing barrels down Fore Street during Beer Regatta"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
