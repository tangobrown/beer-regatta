import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { givingBack } from "@/content/legal/giving-back";

export const metadata: Metadata = {
  title: "Regatta Giving Back",
  description: "How Beer Regatta reinvests surplus funds back into the village community.",
};

export default function GivingBackPage() {
  return <LegalPage content={givingBack} />;
}
