"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";
import SocialLinks from "./SocialLinks";

/**
 * Full-screen navy overlay menu for below `lg`.
 * Accessible: focus trap, Esc to close, focus returned to the trigger,
 * body scroll locked while open. Fades/slides in ~240ms.
 */
export default function MobileMenu({
  open,
  onClose,
  triggerRef,
  activeHref,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  activeHref?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Move focus into the panel on open; return it to the trigger on close.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  // Esc to close + a simple focus trap within the panel.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] flex-col bg-navy lg:hidden ${
        open ? "flex animate-menu-in" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-[14px] sm:px-8">
        <span className="font-sans text-[23px] font-bold leading-[1.05] -tracking-[0.01em] text-white">
          Beer
          <br />
          Regatta
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center text-white transition-colors duration-150 hover:text-cyan"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-5 sm:px-8">
        {NAV_LINKS.map((link, i) => {
          const active = activeHref === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              ref={i === 0 ? firstLinkRef : undefined}
              onClick={onClose}
              aria-current={active ? "true" : undefined}
              className={`flex min-h-[44px] items-center font-sans text-2xl font-bold transition-colors duration-150 hover:text-cyan ${
                active ? "text-cyan" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 pb-10 pt-6 sm:px-8">
        <SocialLinks />
      </div>
    </div>
  );
}
