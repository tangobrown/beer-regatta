import type { ReactNode } from "react";

/** Section h2 at the fluid `h2` scale. Colour picks navy or cyan per section. */
export default function SectionHeading({
  children,
  color = "cyan",
  className = "",
}: {
  children: ReactNode;
  color?: "cyan" | "navy";
  className?: string;
}) {
  return (
    <h2
      className={`font-sans text-h2 font-bold ${
        color === "cyan" ? "text-cyan" : "text-navy"
      } ${className}`}
    >
      {children}
    </h2>
  );
}
