import Carousel from "@/components/Carousel";
import { GALLERY } from "@/content/home";
import { SOCIAL } from "@/lib/site";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-grey pb-20 pt-24 text-navy lg:pb-[110px] lg:pt-[210px]">
      <Carousel shots={GALLERY} />

      <div className="mx-auto max-w-content px-5 pt-16 sm:px-8 lg:px-14 lg:pt-[104px] xl:px-[72px]">
        <h2 className="mb-[18px] font-sans text-h2 font-bold leading-[1.3]">
          <span className="text-cyan">Summary of events</span>
          <br />
          <span className="text-navy">at Beer Regatta 2026.</span>
        </h2>
        <p className="max-w-[760px] text-body-muted text-navy">
          Programmes will be available to purchase at the end of July. In the meantime, keep an eye on
          our{" "}
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold italic text-navy transition-colors duration-150 hover:text-cyan"
          >
            Facebook Page
          </a>{" "}
          for updates.
        </p>
      </div>
    </section>
  );
}
