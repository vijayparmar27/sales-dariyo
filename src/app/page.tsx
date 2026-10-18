import type { Metadata } from "next";

import { HeroSection } from "@/components/hero/hero-section";
import { CustomizableModules } from "@/components/sections/customizable-modules";
import { DevelopmentValue } from "@/components/sections/development-value";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PackagesPricing } from "@/components/sections/packages-pricing";
import { PlatformBenefits } from "@/components/sections/platform-benefits";
import { ProofStats } from "@/components/sections/proof-stats";
import { TechStack } from "@/components/sections/tech-stack";
import { ThreeApps } from "@/components/sections/three-apps";
import { site } from "@/config/site";

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
    <>
      {/* Section B — Immersive Hero */}
      <HeroSection />

      {/* Section C — Proof and Platform Highlights */}
      <ProofStats />

      {/* Section D — One Platform, Three Connected Applications */}
      <ThreeApps />

      {/* Section E — Platform Benefits */}
      <PlatformBenefits />

      {/* Section F — Packages and Pricing */}
      <PackagesPricing />

      {/* Section G — Customizable Modules */}
      <CustomizableModules />

      {/* Section H — How It Works */}
      <HowItWorks />

      {/* Section I — Technology and Architecture */}
      <TechStack />

      {/* Section J — Development Value */}
      <DevelopmentValue />

      {/* Section K — Frequently Asked Questions */}
      <FaqSection />

      {/* Section L — Final Conversion Section */}
      <FinalCta />
    </>
  );
}
