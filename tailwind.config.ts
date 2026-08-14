import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#14263d",
        "navy-deep": "#0f1d31",
        cyan: "#29b8e8",
        "cyan-hover": "#14a3d4",
        "cyan-light": "#7fd6f5",
        grey: "#ececec",
      },
      fontFamily: {
        // Arvo is the only typeface. Exposed as both sans and serif so any
        // default utility resolves to it. The CSS var is set by next/font.
        sans: ["var(--font-arvo)", "Georgia", "serif"],
        serif: ["var(--font-arvo)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1760px",
        legal: "1100px",
        footer: "1200px",
      },
      fontSize: {
        // Fluid tokens from the brief's type scale.
        h1: ["clamp(34px, 4vw, 62px)", { lineHeight: "1.14", letterSpacing: "-0.015em" }],
        marquee: ["clamp(64px, 10vw, 150px)", { lineHeight: "1" }],
        h2: ["clamp(26px, 2.5vw, 38px)", { lineHeight: "1.25" }],
        "h2-welcome": ["clamp(28px, 2.6vw, 40px)", { lineHeight: "1.2" }],
        "h2-contact": ["clamp(25px, 2.3vw, 35px)", { lineHeight: "1.2" }],
        "h1-legal": ["clamp(32px, 3.4vw, 52px)", { lineHeight: "1.2" }],
        body: ["clamp(16px, 1.2vw, 19px)", { lineHeight: "1.75" }],
        "body-welcome": ["clamp(16px, 1.25vw, 19.5px)", { lineHeight: "1.75" }],
        "body-muted": ["clamp(15.5px, 1.2vw, 18.5px)", { lineHeight: "1.75" }],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        carousel: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
        "menu-in": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        // Durations are overridden per-instance inline via [animation-duration:*].
        marquee: "marquee 26s linear infinite",
        carousel: "carousel 60s linear infinite",
        "menu-in": "menu-in 240ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
