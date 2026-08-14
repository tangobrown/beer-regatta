import Link from "next/link";
import { CREDIT_URL, LEGAL_LINKS } from "@/lib/site";

/**
 * Site footer: credit line + copyright/legal line.
 * The year is computed at render time (never hard-coded).
 *
 * `wrap` renders it inside its own <footer> element with gutters (interior
 * pages). When false it renders just the bordered block, for embedding at the
 * end of the home page's contact section.
 */
export default function Footer({ wrap = true }: { wrap?: boolean }) {
  const year = new Date().getFullYear();

  const block = (
    <div className="mx-auto mt-[60px] max-w-footer border-t border-cyan/50 pt-11 text-center">
      <p className="mb-[10px] font-sans text-[16px] text-white/85">
        Website crafted by{" "}
        <a
          href={CREDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan transition-colors duration-150 hover:text-cyan-light"
        >
          Tango Brown
        </a>
      </p>
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-[15px] text-white/60 lg:flex-nowrap lg:whitespace-nowrap">
        <span>© Copyright {year} - Beer Regatta</span>
        {LEGAL_LINKS.map((link) => (
          <span key={link.href} className="flex items-center gap-x-3">
            <span aria-hidden="true" className="text-white/40">
              |
            </span>
            <Link
              href={link.href}
              className="text-cyan transition-colors duration-150 hover:text-cyan-light"
            >
              {link.label}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );

  if (!wrap) return block;

  return (
    <footer className="px-5 pb-[72px] pt-0 sm:px-8 lg:px-14 xl:px-[72px]">
      {block}
    </footer>
  );
}
