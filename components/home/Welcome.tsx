import Link from "next/link";
import Marquee from "@/components/Marquee";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function Welcome() {
  return (
    <section className="bg-grey text-navy lg:-mt-[60px]">
      <Marquee
        text="Welcome"
        colorClassName="text-white"
        durationSeconds={26}
        className="pt-11"
      />

      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-[70px] lg:px-14 lg:pb-[90px] xl:px-[72px]">
        {/* Image — bleeds off the left edge on desktop, full-bleed on mobile */}
        <div className="relative -mx-5 h-[360px] sm:-mx-8 sm:h-[460px] lg:mx-0 lg:ml-[-72px] lg:mt-[-48px] lg:h-[620px]">
          <PlaceholderImage label="Welcome photo: decorated float" />
        </div>

        {/* White card */}
        <div className="bg-white px-6 py-8 sm:px-10 sm:py-12 xl:px-[72px] xl:py-[64px]">
          <h2 className="mb-[22px] font-sans text-h2-welcome font-bold text-navy">Welcome</h2>
          <p className="mb-[18px] text-body-welcome">
            When you see flags and bunting criss-crossing Beer Fore Street in August, it can mean only
            one thing…Regatta Week is here!
          </p>
          <p className="mb-[18px] text-body-welcome">
            First you&rsquo;ve heard of it?{" "}
            <Link
              href="/#facts"
              className="text-cyan transition-colors duration-150 hover:text-cyan-light"
            >
              Click here
            </Link>{" "}
            to learn all about why Beer Regatta is such an unmissable event for the local community and
            visitors alike.
          </p>
          <p className="text-body-welcome">
            Live locally? Regatta regular? Scroll down for news, hints and teasers about what to expect
            this year…
          </p>
        </div>
      </div>
    </section>
  );
}
