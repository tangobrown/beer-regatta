import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { constitution } from "@/content/legal/constitution";

export const metadata: Metadata = {
  title: "Beer Regatta Constitution",
  description: "The constitution of the Beer Regatta Association.",
};

export default function RegattaConstitutionPage() {
  return <LegalPage content={constitution} />;
}
