import type { Metadata } from "next";

import { HeroSection } from "@/components/hero/hero-section";
import { AdminShowcase } from "@/components/sections/admin-showcase";
import { CustomizableModules } from "@/components/sections/customizable-modules";
import { DevelopmentValue } from "@/components/sections/development-value";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ImmersiveShowcase } from "@/components/sections/immersive-showcase";
import { InteractiveDemo } from "@/components/sections/interactive-demo";
import { PackagesPricing } from "@/components/sections/packages-pricing";
import { PlatformBenefits } from "@/components/sections/platform-benefits";
import { ProofStats } from "@/components/sections/proof-stats";
import { RetailWholesaleComparison } from "@/components/sections/retail-wholesale-comparison";
import { TechStack } from "@/components/sections/tech-stack";
import { ThreeApps } from "@/components/sections/three-apps";
import { site } from "@/config/site";
import { demoThemeStyle } from "@/data/demo-store";
import { buildFaqJsonLd, buildSoftwareApplicationJsonLd, buildSoftwareSourceCodeJsonLd, getLanguageAlternates, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `The Commerce Engine Behind Your Next Growth Story | ${site.name}`,
  description:
    "Launch your own branded online store, wholesale portal, and admin platform with a ready-built, production-hardened commerce solution. Permanent source code license, zero recurring GMV cuts.",
  alternates: {
    canonical: "/",
    languages: getLanguageAlternates("/"),
  },
  openGraph: {
    title: `The Commerce Engine Behind Your Next Growth Story | ${site.name}`,
    description:
      "A complete commerce platform: customer storefront, operator admin panel, and cloud backend licensed to your brand and deployed in your cloud accounts.",
    type: "website",
    url: site.url || "https://solutions.dariyo.in",
  },
  twitter: {
    card: "summary_large_image",
    title: `The Commerce Engine Behind Your Next Growth Story | ${site.name}`,
    description:
      "A complete commerce platform: customer storefront, operator admin panel, and cloud backend licensed to your brand and deployed in your cloud accounts.",
  },
};

const HOME_FAQS = [
  {
    question: "Who owns the source code?",
    answer:
      "You get the full source code and a permanent licence to use and modify it for your own business. The licence does not allow reselling it. Your servers, domain, customer records, and database remain in your company name from day one — zero vendor lock-in.",
  },
  {
    question: "Is hosting included in the setup fee?",
    answer:
      "No. Cloud servers, database instances, and media storage are billed directly to your own provider accounts (AWS, Hetzner, MongoDB Atlas) so your data always remains entirely yours.",
  },
  {
    question: "Can you build custom features that are not listed?",
    answer:
      "Yes. Custom software engineering outside the catalog modules is quoted upfront with a fixed milestone plan, or billed at our transparent hourly rate.",
  },
  {
    question: "What do we need to provide before kickoff?",
    answer:
      "Your logo, brand guidelines, product photography, initial product inventory data, and business credentials for payment gateways and couriers. We assist you through the verification process.",
  },
  {
    question: "How fast can our store go live?",
    answer:
      "Starter stores launch in 2 to 3 weeks. Complete omnichannel deployments with wholesale and 3D showcases launch in 8 to 11 weeks.",
  },
  {
    question: "Are there any recurring revenue cuts or GMV fees?",
    answer:
      "Never. We charge 0% commission on your sales. You only pay for your own third-party cloud hosting and payment processing fees directly to each provider.",
  },
];

export default function HomePage() {
  const softwareJsonLd = serializeJsonLd(buildSoftwareApplicationJsonLd());
  const sourceCodeJsonLd = serializeJsonLd(buildSoftwareSourceCodeJsonLd());
  const faqJsonLd = serializeJsonLd(buildFaqJsonLd(HOME_FAQS));

  return (
    // The demos draw in the demo store's own colours (see demo-store.ts).
    <div style={demoThemeStyle()}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: softwareJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sourceCodeJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      {/* Section 2 — Immersive Hero Experience */}
      <HeroSection />

      {/* Section 3 — Trust and Value Proposition Highlights */}
      <ProofStats />

      {/* Section 4 — Interactive Commerce Demonstration (the demo store) */}
      <InteractiveDemo />

      {/* Unified Architecture Overview — Three Connected Applications */}
      <ThreeApps />

      {/* Section 5 — Platform Capabilities & Core Features */}
      <PlatformBenefits />

      {/* Section 6 — Retail vs. Wholesale Dual Channel Comparison */}
      <RetailWholesaleComparison />

      {/* Section 7 — A Closer Look at the Admin Dashboard */}
      <AdminShowcase />

      {/* Section 8 — Product Visualization & Immersive 3D Experiences */}
      <ImmersiveShowcase />

      {/* Section 9 — Technology Stack & Engineering Architecture */}
      <TechStack />

      {/* Build vs Buy Equation — 4,180 Hours of Verified Engineering */}
      <DevelopmentValue />

      {/* Section 10 — Transparent Packages and Pricing */}
      <PackagesPricing />

      {/* Section 11 — Optional Modules & Add-Ons */}
      <CustomizableModules />

      {/* Section 12 — Process and Deployment Roadmap */}
      <HowItWorks />

      {/* Section 13 — Frequently Asked Questions */}
      <FaqSection />

      {/* Section 14 — Final Conversion Section */}
      <FinalCta />
    </div>
  );
}
