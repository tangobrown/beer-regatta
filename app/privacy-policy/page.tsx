import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacyPolicy } from "@/content/legal/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Beer Regatta collects, uses and protects your personal data under the GDPR.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage content={privacyPolicy} />;
}
