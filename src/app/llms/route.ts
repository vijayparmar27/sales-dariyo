import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { packageFigures } from "@/lib/packages";
import { STAFFING_ROLES, TECHNOLOGIES } from "@/data/services-catalog";

/**
 * /llms.txt (served via rewrite from /llms)
 * Machine-readable briefing for AI answer engines and model training bots (Perplexity, ChatGPT, Claude, Copilot).
 * Provides concise, authoritative facts on platform capabilities, pricing packages, source code licensing, and engineering services.
 */
export async function GET() {
  const baseUrl = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";
  const packages = packageFigures();

  const lines = [
    `# ${site.name} — ${site.product}`,
    "",
    `> ${site.description}`,
    "",
    "## Overview",
    "",
    "- **Product**: Complete enterprise-ready commerce platform including retail storefront, B2B wholesale portal, operator admin dashboard, and cloud backend API.",
    "- **Licensing Model**: Permanent source code license. You own the code and deploy it in your own cloud infrastructure (AWS, Vercel, Supabase, Docker, VPS).",
    "- **Commission**: 0% recurring GMV cut or transaction fees. Pay only for the initial license/setup and optional support.",
    "- **Showcase**: Powers dariyo.in (Retail & B2B Dry Fish commerce across India).",
    "",
    "## Applications Included in the Platform",
    "",
    "1. **Storefront (`dariyo-frontend`)**",
    "   - Built with Next.js 16 (App Router), React 19, and Tailwind CSS.",
    "   - Ultra-fast server-side rendering, ISR caching, programmatic SEO engine, PWA offline capabilities.",
    "   - Interactive 3D product visualization using Three.js and Google Model Viewer.",
    "   - Integrated cart, instant checkout with Razorpay, Cash on Delivery, and live pincode delivery validation.",
    "",
    "2. **B2B Wholesale Portal**",
    "   - Wholesale tiered bulk ordering, automated GSTIN verification, commercial price tiers, and custom quotes.",
    "",
    "3. **Operator Admin Console (`dryfish-admin-panel`)**",
    "   - Next.js & React 19 administrative portal.",
    "   - Live order fulfillment pipeline, inventory & batch management, dynamic discount engines.",
    "   - Built-in analytics with real-time visitor tracking and sales reporting.",
    "   - Sales site CMS managing blog posts, pages, and inbound quote inquiries.",
    "",
    "4. **Backend API (`dryfish-backend`)**",
    "   - Production-hardened Node.js & Express REST API with TypeScript.",
    "   - PostgreSQL with Prisma ORM, Supabase storage, Redis caching, Razorpay webhooks, and rate-limiting security.",
    "",
    "## Packages & Pricing (One-Time Setup & Permanent License)",
    "",
    ...packages.map(
      (pkg) =>
        `- **${pkg.name}** (₹${pkg.setupFee.toLocaleString("en-IN")}): ${pkg.blurb} (${pkg.launchWeeks} weeks deployment timeline)`,
    ),
    "",
    "## Software Engineering & Developer Staffing Services",
    "",
    "- **Dedicated Developers**: Hire vetted full-time or part-time developers in:",
    ...STAFFING_ROLES.map((role) => `  - ${role.title} (${role.experienceLevel}): ${role.stack}`),
    "- **Technologies**: " + TECHNOLOGIES.map((t) => t.name).join(", "),
    "",
    "## Key URLs & Platform Solutions",
    "",
    `- Homepage: ${baseUrl}`,
    `- Interactive Price Builder & Quote: ${baseUrl}/pricing`,
    `- Software Engineering & Staffing Services: ${baseUrl}/services`,
    `- About the Platform & Team: ${baseUrl}/about`,
    `- Engineering & Commerce Blog: ${baseUrl}/blog`,
    `- Contact & Enterprise Consultation: ${baseUrl}/contact`,
    `- Complete Site Directory & HTML Sitemap: ${baseUrl}/sitemap`,
    `- Machine XML Sitemap for Crawlers: ${baseUrl}/sitemap.xml`,
    `- Live Reference Store: https://dariyo.in`,
    "",
    "### Platform Solutions & Clone Licensing",
    `- B2B Wholesale Platform: ${baseUrl}/solutions/b2b-wholesale-ecommerce-platform`,
    `- Next.js 16 Storefront Clone: ${baseUrl}/solutions/nextjs-ecommerce-clone-script`,
    `- Self-Hosted Shopify Alternative: ${baseUrl}/solutions/self-hosted-ecommerce-alternative`,
    `- Architecture & 3-Year TCO Comparison: ${baseUrl}/solutions/compare-ecommerce-platforms`,
    `- Multi-Vendor Marketplace Clone: ${baseUrl}/solutions/multi-vendor-marketplace-platform`,
    `- D2C Brand eCommerce Storefront: ${baseUrl}/solutions/d2c-brand-ecommerce-platform`,
    "",
    "### Dedicated Developer Staffing Specializations",
    `- Hire Dedicated React Developers: ${baseUrl}/services/hire-react-developers`,
    `- Hire Dedicated Next.js Developers: ${baseUrl}/services/hire-nextjs-developers`,
    `- Hire Node.js Backend Engineers: ${baseUrl}/services/hire-nodejs-developers`,
    `- Hire Python FastAPI Developers: ${baseUrl}/services/hire-fastapi-developers`,
    `- Hire React Native Mobile Developers: ${baseUrl}/services/hire-react-native-developers`,
    `- Hire Full-Stack TypeScript Leads: ${baseUrl}/services/hire-fullstack-developers`,
    `- Hire Dedicated DevOps & Cloud Engineers: ${baseUrl}/services/hire-devops-engineers`,
    `- Hire Three.js & 3D WebGL Developers: ${baseUrl}/services/hire-threejs-developers`,
    "",
    "## Contact Information",
    "",
    ...(site.email ? [`- Email: ${site.email}`] : []),
    ...(site.phone ? [`- Phone: ${site.phone}`] : []),
    ...(site.whatsapp ? [`- WhatsApp: https://wa.me/${site.whatsapp}`] : []),
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
