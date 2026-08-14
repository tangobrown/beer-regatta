import type { Shot } from "@/components/Carousel";

export const FACTS = [
  {
    n: "1",
    body:
      "Beer Regatta is over 100 years old! But there's some debate about whether the first official event took place in 1913 or 1914.",
  },
  {
    n: "2",
    body:
      "You won't see Beer Luggers anywhere else. The design of these majestic boats is unique to Beer village.",
  },
  {
    n: "3",
    body:
      "Regatta's about more than racing. Our barrel-rolling, spoofing and zing zong are just a few quirky traditions that might be new to you.",
  },
  {
    n: "4",
    body:
      "It's a team effort! Beer Regatta relies entirely on committee volunteers, a broad network of supporters, sponsors and donations.",
  },
] as const;

// Gallery tiles. Each has a real photo in /public/images plus descriptive alt.
// (Two further tiles — IMG_7585 and IMG_5395 — are pending re-export at a
// web-friendly size; add them here as gallery-4/gallery-8 once available.)
export const GALLERY: Shot[] = [
  { id: "1", src: "/images/gallery-1.jpg", alt: "Crowds enjoying Beer Regatta week" },
  { id: "2", src: "/images/gallery-2.jpg", alt: "Beer Regatta festivities on Fore Street" },
  { id: "3", src: "/images/gallery-3.jpg", alt: "Beer Regatta on the seafront" },
  { id: "5", src: "/images/gallery-5.jpg", alt: "Barrel-rolling race down Fore Street" },
  { id: "6", src: "/images/gallery-6.jpg", alt: "Beer lifeboat crew during Regatta" },
  { id: "7", src: "/images/gallery-7.jpg", alt: "Racing at Beer Regatta" },
];
