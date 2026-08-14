import type { SVGProps } from "react";

/** X / Twitter glyph — copied from the design prototype markup. */
export function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23 4.9c-.9.4-1.8.7-2.8.8a4.8 4.8 0 0 0 2.1-2.6c-.9.6-2 1-3.1 1.2a4.9 4.9 0 0 0-8.4 4.4A13.9 13.9 0 0 1 1.7 3.6a4.9 4.9 0 0 0 1.5 6.5c-.8 0-1.6-.2-2.2-.6 0 2.3 1.6 4.3 3.9 4.8-.7.2-1.5.2-2.2.1a4.9 4.9 0 0 0 4.6 3.4A9.9 9.9 0 0 1 0 19.9 13.9 13.9 0 0 0 21.5 8c0-.2 0-.4 0-.6.9-.7 1.7-1.5 2.3-2.5z" />
    </svg>
  );
}

/** Facebook glyph — copied from the design prototype markup. */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.5 8.5V6.8c0-.8.2-1.3 1.4-1.3h1.8V2.1A25 25 0 0 0 15.1 2C12 2 10.4 3.7 10.4 6.6v1.9H8v3.4h2.4V22h4.1v-10h2.7l.4-3.5h-3.1z" />
    </svg>
  );
}

/** Cyan outline calendar icon used beside the hero date rows. */
export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="4.5" width="18" height="17" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}
