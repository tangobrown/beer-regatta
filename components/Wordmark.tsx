import Link from "next/link";

/** Two-line "Beer / Regatta" wordmark, 23px/700, links to home. */
export default function Wordmark({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/#top"
      onClick={onClick}
      aria-label="Beer Regatta — home"
      className={`font-sans text-[23px] font-bold leading-[1.05] -tracking-[0.01em] text-white ${className}`}
    >
      Beer
      <br />
      Regatta
    </Link>
  );
}
