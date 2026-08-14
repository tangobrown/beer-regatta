import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { givingBack } from "@/content/legal/giving-back";

export const metadata: Metadata = {
  title: "Regatta Giving Back",
  description:
    "How Beer Regatta reinvests surplus funds back into the village community, and how local organisations can apply for support.",
  alternates: { canonical: "/giving-back" },
};

export default function GivingBackPage() {
  return <LegalPage content={givingBack} />;
}
