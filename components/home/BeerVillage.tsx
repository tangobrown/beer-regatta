import PlaceholderImage from "@/components/PlaceholderImage";

export default function BeerVillage() {
  return (
    <section id="beer" className="bg-navy-deep pb-16 pt-[72px] lg:pb-[120px] lg:pt-[180px]">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
        {/* Copy — right-justified in its track with a 72px left gutter on desktop */}
        <div className="px-5 sm:px-8 lg:w-full lg:max-w-[920px] lg:justify-self-end lg:pl-[72px] lg:pr-0">
          <h2 className="mb-7 font-sans text-h2 font-bold text-cyan">About Beer Village</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[54px]">
            <div>
              <p className="mb-5 font-sans text-body font-bold leading-[1.7] text-white">
                Instantly recognisable by those fortunate enough to have stumbled across its
                breathtaking chalk-white cliffs, traditional working pebble beach and tranquil cove,
                the village of Beer is something of a hidden jewel in the crown of East Devon.
              </p>
              <p className="font-sans text-body font-bold leading-[1.7] text-white">
                But there&rsquo;s more to Beer than just beguiling looks.
              </p>
            </div>
            <div>
              <p className="mb-[18px] text-body-muted text-white/90">
                The village also boasts a vibrant and colourful history that transcends its size – over
                the years it&rsquo;s been known for everything; from lace, to stone, and even
                eighteenth-century smugglers!
              </p>
              <p className="text-body-muted text-white/90">
                Modern-day Beer has everything your heart could desire for a relaxing and memorable
                stay. Independent shops, local businesses and tourist attractions are its beating heart
                – many of which are family run and have been here for generations.
              </p>
            </div>
          </div>
        </div>

        {/* Image — full-bleed to the right edge on desktop */}
        <div className="relative -mx-5 mt-10 h-[320px] sm:-mx-8 lg:mx-0 lg:mt-0 lg:h-[620px]">
          <PlaceholderImage label="Beer village: cliffs and cove" />
        </div>
      </div>
    </section>
  );
}
