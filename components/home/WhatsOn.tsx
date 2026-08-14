import Marquee from "@/components/Marquee";

export default function WhatsOn() {
  return (
    <section id="events" className="bg-cyan text-navy">
      <Marquee
        text="What's on?"
        colorClassName="text-white/[0.32]"
        durationSeconds={28}
        className="pt-[34px]"
      />

      <div className="relative z-[2] mx-auto grid max-w-content grid-cols-1 items-start gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_clamp(340px,32%,520px)] lg:gap-[70px] lg:px-14 lg:pb-[96px] lg:pt-[68px] xl:px-[72px]">
        <div>
          <h2 className="mb-5 font-sans text-h2 font-bold text-navy">What&rsquo;s On?</h2>
          <h3 className="mb-[18px] font-sans text-[21px] font-bold text-navy">
            Beer Regatta Week 2026 at a Glance
          </h3>
          <p className="mb-4 max-w-[560px] text-body text-white">
            Events for Regatta 2026 will be available soon.
          </p>
          <p className="max-w-[560px] text-body text-white">
            Our firework display will be back with a BANG along with family favourites such as barrel
            rolling and raft building.
          </p>
        </div>

        {/* Testimonial — hangs ~190px into the grey gallery below (desktop only) */}
        <figure className="relative z-[3] flex flex-col justify-center bg-white px-8 pb-[46px] pt-11 lg:mb-[-190px] lg:mt-[90px] lg:px-14">
          <blockquote className="mb-[22px] text-body italic text-navy">
            &ldquo;Beer Regatta is a proper village event – having fun, joining in, making memories!
            It&rsquo;s a week packed with smiles, laughter and fantastic activities. It&rsquo;s a
            privilege to be involved in Beer Regatta, and I hope you enjoy it as much as we all do!&rdquo;
          </blockquote>
          <figcaption className="font-sans text-body-muted font-bold text-navy">
            Sarah – Local Resident
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
