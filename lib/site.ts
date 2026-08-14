/** Shared, single-source-of-truth site constants. */

export const SOCIAL = {
  twitter: "https://twitter.com/BeerRegatta",
  facebook: "https://en-gb.facebook.com/BeerRegatta/",
} as const;

export const CREDIT_URL = "https://tangobrown.com";

/** Primary nav — anchors on the home page. */
export const NAV_LINKS = [
  { label: "Home", href: "/#top" },
  { label: "Facts", href: "/#facts" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Events", href: "/#events" },
  { label: "Beer Village", href: "/#beer" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Footer legal links. */
export const LEGAL_LINKS = [
  { label: "Regatta Constitution", href: "/regatta-constitution" },
  { label: "Regatta Giving Back", href: "/giving-back" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const;
