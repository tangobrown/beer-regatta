/**
 * Placeholder image slot. No photography ships with this build — every image
 * position renders an intentional, labelled slot. Each fills its parent box
 * (the parent reserves the aspect ratio, so CLS stays ~0).
 *
 * To drop in real art later, replace the inner markup with:
 *   <Image src={...} alt={...} fill className="object-cover" sizes="..." />
 * The parent's aspect/height box already reserves the space.
 */
export default function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden bg-navy-deep">
      {/* subtle cross-hatch so the slot reads as a frame, not a flat panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(41,184,232,0.10) 0 1px, transparent 1px 22px), linear-gradient(45deg, rgba(41,184,232,0.10) 0 1px, transparent 1px 22px)",
        }}
      />
      <div className="absolute inset-4 border border-cyan/25" aria-hidden="true" />
      <svg
        width="46"
        height="46"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#29b8e8"
        strokeWidth="1.4"
        aria-hidden="true"
        className="relative z-10 opacity-80"
      >
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <circle cx="8.5" cy="10" r="1.6" />
        <path d="M3 17l5-4.5 3.5 3L16 10l5 4.5" />
      </svg>
      <span className="relative z-10 max-w-[80%] px-4 text-center font-sans text-[13px] font-bold uppercase tracking-wide text-cyan/80">
        {label}
      </span>
    </div>
  );
}
