import Image from "next/image";

// Background photo for the section (Beer_Beachside). While null, the section
// falls back to a deep navy gradient so it reads as intentional, not broken.
const BG_SRC: string | null = "/images/village.jpg";

export default function BeerVillage() {
  return (
    <section id="beer" className="relative overflow-hidden bg-navy-deep">
      {/* Background image layer */}
      {BG_SRC && (
        <Image
          src={BG_SRC}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      )}
      {/* Legibility overlay — keeps the white/cyan copy readable over any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/70"
      />

      {/* Copy */}
      <div className="relative mx-auto max-w-content px-5 py-[72px] sm:px-8 lg:px-14 lg:py-[180px] xl:px-[72px]">
        <div className="max-w-[920px]">
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
      </div>
    </section>
  );
}
