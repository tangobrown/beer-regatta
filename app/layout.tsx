import type { Metadata } from "next";
import { Arvo } from "next/font/google";
import "./globals.css";

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-arvo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beerregatta.co.uk"),
  title: "Beer Regatta | Racing, rafts, barrel-rolling and bingo",
  description:
    "Beer Regatta — the annual regatta week in Beer, East Devon. Racing and rafts, barrel-rolling and bingo. Fireworks, fancy dress and fun for all the family.",
  openGraph: {
    title: "Beer Regatta",
    description:
      "The annual regatta week in Beer, East Devon. Fireworks, fancy dress and fun for all the family.",
    url: "https://beerregatta.co.uk",
    siteName: "Beer Regatta",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={arvo.variable}>
      <body className="bg-navy font-sans text-white antialiased">{children}</body>
    </html>
  );
}
