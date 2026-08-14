import type { Metadata, Viewport } from "next";
import { Arvo } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, siteJsonLd } from "@/lib/seo";

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-arvo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Beer Regatta 2026 | Racing, Rafts & Fireworks in Beer, Devon",
    template: "%s | Beer Regatta",
  },
  description:
    "Beer Regatta 2026 runs Saturday 8th – Friday 14th August, with Regatta Day on Thursday 13th August. Racing, rafts, barrel-rolling, fireworks and fancy dress in Beer, East Devon.",
  applicationName: SITE_NAME,
  keywords: [
    "Beer Regatta",
    "Beer Regatta 2026",
    "Regatta Day 2026",
    "Beer Devon",
    "Beer East Devon",
    "regatta week",
    "Beer village events",
    "Devon regatta",
    "barrel rolling",
    "raft race",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Beer Regatta 2026",
    description:
      "The annual regatta week in Beer, East Devon — 8th–14th August 2026. Fireworks, fancy dress and fun for all the family.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beer Regatta 2026",
    description:
      "The annual regatta week in Beer, East Devon — 8th–14th August 2026.",
    site: "@BeerRegatta",
    creator: "@BeerRegatta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "events",
};

export const viewport: Viewport = {
  themeColor: "#14263d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={arvo.variable}>
      <body className="bg-navy font-sans text-white antialiased">
        {children}
        <JsonLd data={siteJsonLd} />
      </body>
    </html>
  );
}
