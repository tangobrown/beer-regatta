# Beer Regatta

Marketing site for **Beer Regatta** — the annual regatta week in Beer, East Devon.
Built to the Claude Design hand-off brief. One long scrolling home page plus three
legal/info pages, fully responsive with a deliberately smooth mobile experience.

**Stack:** Next.js 14 (App Router) · Tailwind CSS · TypeScript · `next/font` (Arvo).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Structure

```
app/
  layout.tsx              Arvo font, global metadata
  page.tsx                Home — Hero, Welcome, Facts, WhatsOn, Gallery, BeerVillage, Contact
  regatta-constitution/   ┐
  giving-back/            ├ interior pages via <LegalPage/> + typed content
  privacy-policy/         ┘
components/
  Header.tsx MobileMenu.tsx Footer.tsx Wordmark.tsx SocialLinks.tsx
  Marquee.tsx Carousel.tsx SectionHeading.tsx PlaceholderImage.tsx
  LegalPage.tsx icons.tsx
  home/                   one file per home-page section
content/
  home.ts                 facts + gallery data
  legal/*.ts              verbatim legal copy (constitution, giving-back, privacy-policy)
lib/site.ts               nav links, social/legal URLs
```

## Design tokens

Defined in `tailwind.config.ts`: `navy`, `navy-deep`, `cyan`, `cyan-hover`,
`cyan-light`, `grey`. Fluid type roles (`text-h1`, `text-h2`, `text-body`, …) are
also tokens there. Border radius is **0 everywhere** and there are no shadows —
hard corners are part of the identity.

## Images

**No photography ships with this build.** Every image position renders an
intentional, labelled `<PlaceholderImage/>` slot that reserves its aspect ratio
(so CLS stays ~0). See `public/images/.gitkeep` for the list of positions and how
to swap in real art with `next/image`.

## Notable behaviours

- **Sticky header** with scroll-spy active state; below `lg` it collapses to an
  accessible full-screen menu (focus trap, `Esc`, scroll lock, focus return).
- **Marquees** loop seamlessly (two identical groups, `0 → -50%`); paused under
  `prefers-reduced-motion`.
- **Carousel** auto-scrolls at a constant perceived velocity and shares one scroll
  coordinate with native swipe, so it never fights the user; pauses on hover
  (desktop) and touch (mobile, resuming ~1.5s after release); swipe-only under
  reduced motion.
- **Testimonial overlap** into the gallery is a desktop-only (`lg+`) flourish.
- Footer copyright **year is computed at render** (`new Date().getFullYear()`).

## Verified

No horizontal page scroll at 320/375/768/1024/1440/1920; mobile menu opens with no
overflow; footer shows the current year. (See `npm run build` + the checks in the
hand-off notes.)
