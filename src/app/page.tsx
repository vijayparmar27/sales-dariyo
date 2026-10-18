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

export const metadata: Metadata = {
  title: `The Commerce Engine Behind Your Next Growth Story | ${site.name}`,
  description:
    "Launch your own branded online store, wholesale portal, and admin platform with a ready-built, production-hardened commerce solution. Permanent source code license, zero recurring GMV cuts.",
  openGraph: {
    title: `The Commerce Engine Behind Your Next Growth Story | ${site.name}`,
    description:
      "A complete commerce platform: customer storefront, operator admin panel, and cloud backend licensed to your brand and deployed in your cloud accounts.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    // The demos draw in the demo store's own colours (see demo-store.ts).
    <div style={demoThemeStyle()}>
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
