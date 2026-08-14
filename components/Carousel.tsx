"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";

/** A tile is either a real photo (src + alt) or a labelled placeholder slot. */
export type Shot = {
  id: string;
  src?: string;
  alt?: string;
  label?: string;
};

/** Constant pixel velocity keeps perceived speed identical across tile sizes. */
const VELOCITY_PX_PER_SEC = 60;
const RESUME_DELAY_MS = 1500;

/**
 * Continuous photo carousel.
 *
 * One flex track holds the tiles rendered twice; auto-scroll advances
 * `scrollLeft` (shared with native swipe, so the two never fight) and wraps at
 * the halfway point for a seamless loop. Desktop clips overflow and pauses on
 * hover; mobile is a snap-swipe strip that pauses while touched and resumes
 * ~1.5s after release. No auto-scroll under `prefers-reduced-motion` — swipe only.
 */
export default function Carousel({ shots }: { shots: Shot[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const touchingRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return; // swipe only

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const paused = hoveringRef.current || touchingRef.current;
      if (!paused) {
        const half = el.scrollWidth / 2;
        if (half > 0) {
          let next = el.scrollLeft + VELOCITY_PX_PER_SEC * dt;
          if (next >= half) next -= half; // seamless wrap
          el.scrollLeft = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shots.length]);

  const pauseForTouch = () => {
    touchingRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };
  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      touchingRef.current = false;
    }, RESUME_DELAY_MS);
  };

  // Keep the wrap consistent if the user swipes past the halfway seam.
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
  };

  const rendered = [...shots, ...shots];

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
      onTouchStart={pauseForTouch}
      onTouchEnd={scheduleResume}
      onTouchCancel={scheduleResume}
      onScroll={onScroll}
      className="carousel-track no-scrollbar flex snap-x snap-mandatory gap-7 overflow-x-auto overscroll-x-contain lg:snap-none lg:overflow-hidden"
      style={{ willChange: "scroll-position" }}
      aria-label="Photos from Beer Regatta"
    >
      {rendered.map((shot, i) => (
        <div
          key={`${shot.id}-${i}`}
          className="relative h-[320px] w-[260px] flex-none snap-center sm:h-[400px] sm:w-[320px] lg:h-[500px] lg:w-[420px]"
          aria-hidden={i >= shots.length ? "true" : undefined}
        >
          {shot.src ? (
            <Image
              src={shot.src}
              alt={i >= shots.length ? "" : shot.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 320px, 260px"
              className="object-cover"
            />
          ) : (
            <PlaceholderImage label={shot.label ?? ""} />
          )}
        </div>
      ))}
    </div>
  );
}
