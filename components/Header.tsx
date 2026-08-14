"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";
import Wordmark from "./Wordmark";
import SocialLinks from "./SocialLinks";
import MobileMenu from "./MobileMenu";

const SECTION_IDS = ["top", "facts", "gallery", "events", "beer", "contact"];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("top");
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close the menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    if (!isHome) return;
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Bias the active band to just below the sticky header.
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const activeHref = isHome ? `/#${activeId}` : undefined;

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy">
        <div className="flex items-center justify-between gap-6 px-5 py-[14px] sm:px-8 lg:px-14 lg:py-[22px]">
          <Wordmark />

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden flex-wrap items-center gap-x-[22px] gap-y-[10px] font-sans text-[17.5px] font-normal lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const active = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  className={`border-b pb-[2px] transition-colors duration-150 hover:text-cyan ${
                    active ? "border-cyan text-white" : "border-transparent text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop social */}
          <SocialLinks className="hidden lg:flex" />

          {/* Mobile hamburger */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center text-white transition-colors duration-150 hover:text-cyan lg:hidden"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        activeHref={activeHref}
      />
    </>
  );
}
