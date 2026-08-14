import Marquee from "@/components/Marquee";
import PlaceholderImage from "@/components/PlaceholderImage";
import { FACTS } from "@/content/home";

export default function Facts() {
  return (
    <section id="facts" className="bg-navy">
      <Marquee
        text="Did you know?"
        colorClassName="text-white/[0.06]"
        durationSeconds={30}
        className="pt-9"
      />

      <div className="mx-auto grid max-w-content grid-cols-1 items-start gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[60px] lg:px-14 lg:pb-[110px] lg:pt-[52px] xl:px-[72px]">
        <div>
          <h2 className="mb-[34px] font-sans text-h2 font-bold text-cyan">Did you know?</h2>
          <div className="grid grid-cols-1 gap-x-[50px] gap-y-9 sm:grid-cols-2">
            {FACTS.map((fact) => (
              <div key={fact.n}>
                <div className="mb-[10px] font-sans text-[29.5px] font-bold leading-none">
                  {fact.n}
                </div>
                <p className="text-body-muted text-white/[0.86]">{fact.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image — bleeds off the right edge on desktop */}
        <div className="relative -mx-5 h-[300px] sm:-mx-8 sm:h-[380px] lg:mx-0 lg:mr-[-72px] lg:mt-[-24px] lg:h-[500px]">
          <PlaceholderImage label="Facts photo: fancy dress raft team" />
        </div>
      </div>
    </section>
  );
}
