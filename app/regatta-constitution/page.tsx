import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { constitution } from "@/content/legal/constitution";

export const metadata: Metadata = {
  title: "Regatta Constitution",
  description:
    "The constitution of the Beer Regatta Association — its name, purposes, committee, meetings, AGM and handling of money and property.",
  alternates: { canonical: "/regatta-constitution" },
};

export default function RegattaConstitutionPage() {
  return <LegalPage content={constitution} />;
}
