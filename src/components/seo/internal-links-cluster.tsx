import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CatalisBadge } from "@/components/ui";

export interface InternalLinkItem {
  title: string;
  href: string;
  badge?: string;
  description: string;
}

export const CLONE_SOLUTION_LINKS: InternalLinkItem[] = [
  {
    title: "B2B Wholesale eCommerce Platform",
    href: "/solutions/b2b-wholesale-ecommerce-platform",
    badge: "Turnkey",
    description: "Tiered wholesale pricing, automated GSTIN validation, bulk quote builders, and credit terms.",
  },
  {
    title: "Next.js 16 Storefront Clone",
    href: "/solutions/nextjs-ecommerce-clone-script",
    badge: "Next.js 16",
    description: "Production App Router storefront with sub-second page loads, 3D Canvas visualizer, and Razorpay/Stripe.",
  },
  {
    title: "Self-Hosted Shopify & Medusa Alternative",
    href: "/solutions/self-hosted-ecommerce-alternative",
    badge: "0% Commission",
    description: "Permanent source code license. Deploy directly in your AWS, Hetzner, or private VPS infrastructure.",
  },
  {
    title: "eCommerce Platform Architecture Comparison",
    href: "/solutions/compare-ecommerce-platforms",
    badge: "TCO Matrix",
    description: "Dariyo vs Shopify Plus vs MedusaJS vs Custom Development: 3-year TCO, source code rights, and launch velocity.",
  },
  {
    title: "Transparent Platform Packages & Pricing",
    href: "/pricing",
    badge: "Calculator",
    description: "Configure your setup fee, support tier, and monthly cloud hosting with our interactive cost builder.",
  },
];

export const STAFFING_SERVICE_LINKS: InternalLinkItem[] = [
  {
    title: "Hire Dedicated React Developers",
    href: "/services/hire-react-developers",
    badge: "React 19",
    description: "Senior React engineers specializing in TypeScript, Tailwind CSS, TanStack Query, and UI design systems.",
  },
  {
    title: "Hire Dedicated Next.js Developers",
    href: "/services/hire-nextjs-developers",
    badge: "Next.js 16",
    description: "App Router experts for Server Components (RSC), Edge caching, ISR, and Core Web Vitals optimization.",
  },
  {
    title: "Hire Node.js Backend Engineers",
    href: "/services/hire-nodejs-developers",
    badge: "Node.js",
    description: "High-throughput TypeScript APIs, HMAC webhooks, MongoDB/PostgreSQL pooling, and microservices.",
  },
  {
    title: "Hire Python FastAPI Developers",
    href: "/services/hire-fastapi-developers",
    badge: "Python",
    description: "Asynchronous microservices, AI/LLM embeddings, Celery queues, and compute-heavy data pipelines.",
  },
  {
    title: "Hire React Native Mobile Developers",
    href: "/services/hire-react-native-developers",
    badge: "iOS & Android",
    description: "Native 60fps cross-platform mobile apps using Expo SDK, push notifications, and offline sync.",
  },
  {
    title: "Hire Full-Stack TypeScript Leads",
    href: "/services/hire-fullstack-developers",
    badge: "Architect",
    description: "End-to-end web & mobile engineering, Docker cloud DevOps, database architecture, and team mentorship.",
  },
];

export interface InternalLinksClusterProps {
  className?: string;
  showCloneLinks?: boolean;
  showStaffingLinks?: boolean;
}

/**
 * High-authority internal linking cluster connecting platform clone solutions and developer staffing.
 * Passes PageRank, strengthens topic clusters, and anchors targeted search queries across Google.
 */
export function InternalLinksCluster({
  className = "py-16 sm:py-20",
  showCloneLinks = true,
  showStaffingLinks = true,
}: InternalLinksClusterProps) {
  return (
    <section className={`border-t border-line/60 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <CatalisBadge variant="blue">Topic Index &amp; Semantic Cluster</CatalisBadge>
          <h2 className="mt-3 font-serif text-2xl tracking-tight text-ink sm:text-3xl">
            Explore Solutions, Source Code, and Dedicated Engineering
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Browse our pre-engineered commerce platform solutions or assemble a dedicated engineering team with pre-vetted senior talent.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {showCloneLinks && (
            <div>
              <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-semibold text-ink">
                  Commerce Platform Source Code &amp; Solutions
                </h3>
                <Link
                  href="/pricing"
                  className="text-xs font-medium text-brand-blue hover:underline"
                >
                  View Packages &rarr;
                </Link>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {CLONE_SOLUTION_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand-blue/50 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {item.badge && (
                          <span className="rounded bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 text-[11px] font-medium text-brand-blue">
                            {item.badge}
                          </span>
                        )}
                        <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                      </div>
                      <h4 className="text-sm font-semibold text-ink group-hover:text-brand-blue transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {showStaffingLinks && (
            <div>
              <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-semibold text-ink">
                  Dedicated Developer Staffing &amp; Technology Pods
                </h3>
                <Link
                  href="/services"
                  className="text-xs font-medium text-brand-blue hover:underline"
                >
                  All Services &rarr;
                </Link>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {STAFFING_SERVICE_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand-blue/50 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {item.badge && (
                          <span className="rounded bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                            {item.badge}
                          </span>
                        )}
                        <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                      </div>
                      <h4 className="text-sm font-semibold text-ink group-hover:text-brand-blue transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
