import { SOCIAL } from "./site";

export const SITE_URL = "https://beerregatta.co.uk";
export const SITE_NAME = "Beer Regatta";

/** Regatta 2026 dates (ISO), from the client's confirmed schedule. */
export const REGATTA_2026 = {
  start: "2026-08-08", // Saturday 8th August
  end: "2026-08-14", // Friday 14th August
  regattaDay: "2026-08-13", // Thursday 13th August
};

const eventDescription =
  "Beer Regatta 2026 is the annual regatta week in Beer, East Devon — racing and rafts, barrel-rolling and bingo, fireworks, fancy dress and fun for all the family. Regatta week runs Saturday 8th to Friday 14th August 2026, with Regatta Day on Thursday 13th August.";

const place = {
  "@type": "Place",
  name: "Beer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beer",
    addressRegion: "Devon",
    addressCountry: "GB",
  },
};

const organizer = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  sameAs: [SOCIAL.twitter, SOCIAL.facebook],
};

/**
 * Site-wide JSON-LD: Organization + WebSite. Rendered on every page so search
 * engines have a consistent entity for "Beer Regatta".
 */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      sameAs: [SOCIAL.twitter, SOCIAL.facebook],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

/**
 * Home-page JSON-LD: the Beer Regatta 2026 Event (plus Regatta Day as a
 * sub-event) — the schema most likely to surface a rich result for people
 * searching "beer regatta 2026".
 */
export const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Beer Regatta 2026",
  startDate: REGATTA_2026.start,
  endDate: REGATTA_2026.end,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  description: eventDescription,
  image: [`${SITE_URL}/images/hero.jpg`],
  url: SITE_URL,
  location: place,
  organizer,
  isAccessibleForFree: true,
  subEvent: {
    "@type": "Event",
    name: "Regatta Day 2026",
    startDate: REGATTA_2026.regattaDay,
    endDate: REGATTA_2026.regattaDay,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: place,
    organizer,
    isAccessibleForFree: true,
  },
};
