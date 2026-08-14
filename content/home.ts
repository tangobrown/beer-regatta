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

export const GALLERY: Shot[] = [
  "Fancy dress crew",
  "Raft race",
  "Barrel rolling",
  "Children racing",
  "Beer beach",
  "Fireworks",
  "Regatta parade",
  "Prize giving",
].map((label, i) => ({ id: String(i + 1), label }));
