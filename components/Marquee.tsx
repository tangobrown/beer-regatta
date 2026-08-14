/**
 * Decorative infinite marquee. Two identical word groups animate 0 → -50%
 * for a seamless loop. Overflow is clipped on the outer wrapper so no
 * page-level horizontal scroll ever appears. Paused under reduced-motion
 * (handled globally via the `.marquee-track` class in globals.css).
 */
export default function Marquee({
  text,
  colorClassName,
  durationSeconds,
  className = "",
  repeat = 4,
}: {
  text: string;
  colorClassName: string;
  durationSeconds: number;
  className?: string;
  repeat?: number;
}) {
  const group = (
    <div className="flex shrink-0" aria-hidden="true">
      {Array.from({ length: repeat }).map((_, i) => (
        <span key={i} className="whitespace-nowrap pr-20">
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max animate-marquee font-sans text-marquee font-bold ${colorClassName}`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
