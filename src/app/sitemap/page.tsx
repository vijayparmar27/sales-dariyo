import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  FileCode2,
  FileText,
  Layers,
  Rss,
  Search,
  Shield,
  ShoppingBag,
  Terminal,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { InternalLinksCluster } from "@/components/seo/internal-links-cluster";
import { CatalisBadge } from "@/components/ui";
import { site } from "@/config/site";
import { ROLE_LANDING_PAGES, SOLUTION_LANDING_PAGES } from "@/data/seo-landing-data";
import { STAFFING_ROLES } from "@/data/services-catalog";
import type { LanguageCode } from "@/lib/i18n/languages";
import { getServerI18n } from "@/lib/i18n/server";
import { packageFigures } from "@/lib/packages";
import {
  buildBreadcrumbJsonLd,
  buildSitemapCollectionJsonLd,
  serializeJsonLd,
} from "@/lib/seo";
import { getLocalizedMetadata } from "@/lib/seo-multilingual";
import { getPosts } from "@/lib/site-api";

interface SitemapPageProps {
  searchParams?: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: SitemapPageProps): Promise<Metadata> {
  const resolved = searchParams ? await searchParams : {};
  const lang = (resolved?.lang || "en") as LanguageCode;
  return getLocalizedMetadata("sitemap", lang, "/sitemap");
}

export default async function SitemapPage({ searchParams }: SitemapPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const baseUrl = site.url ? site.url.replace(/\/+$/, "") : "https://solutions.dariyo.in";

  const [{ formatMoney }, blogPosts] = await Promise.all([
    getServerI18n(params),
    getPosts().catch(() => []),
  ]);

  const packages = packageFigures();

  const breadcrumbsJsonLd = serializeJsonLd(
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Sitemap", path: "/sitemap" },
    ]),
  );
  const sitemapCollectionJsonLd = serializeJsonLd(buildSitemapCollectionJsonLd(baseUrl));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-6 sm:pt-32 lg:pb-24 print:p-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sitemapCollectionJsonLd }}
      />

      <Breadcrumbs items={[{ name: "Sitemap", path: "/sitemap" }]} />

      {/* Hero Header */}
      <div className="mt-8">
        <CatalisBadge
          icon={<Layers className="size-3.5" />}
          variant="neutral"
          className="border-accent/40 bg-accent/5 text-accent"
        >
          System Architecture & Directory
        </CatalisBadge>

        <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-5xl">
          Complete Site Directory &{" "}
          <span className="italic text-accent">Architecture Index</span>
        </h1>

        <p className="mt-4 max-w-3xl text-base text-muted sm:text-lg">
          Explore all commerce software clones, custom B2B wholesale systems, dedicated developer
          staffing specializations, commercial packages, and machine protocols powering the{" "}
          <strong className="font-semibold text-ink">{site.name}</strong> platform.
        </p>

        {/* Fast jump anchor bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-y border-line py-3 text-xs sm:text-sm">
          <span className="font-medium text-muted">Jump to section:</span>
          <a
            href="#solutions"
            className="rounded-full bg-sunken px-3 py-1 text-ink/80 transition-colors hover:bg-accent/10 hover:text-accent"
          >
            Platform Clones
          </a>
          <a
            href="#developers"
            className="rounded-full bg-sunken px-3 py-1 text-ink/80 transition-colors hover:bg-accent/10 hover:text-accent"
          >
            Dedicated Talent
          </a>
          <a
            href="#pricing"
            className="rounded-full bg-sunken px-3 py-1 text-ink/80 transition-colors hover:bg-accent/10 hover:text-accent"
          >
            Pricing & Packages
          </a>
          <a
            href="#company"
            className="rounded-full bg-sunken px-3 py-1 text-ink/80 transition-colors hover:bg-accent/10 hover:text-accent"
          >
            Company & Articles
          </a>
          <a
            href="#machine-feeds"
            className="rounded-full bg-sunken px-3 py-1 text-ink/80 transition-colors hover:bg-accent/10 hover:text-accent"
          >
            Feeds & Protocols
          </a>
        </div>
      </div>

      {/* ── Section 1: Commercial Software Clones & Turnkey Solutions ── */}
      <section id="solutions" className="mt-16 scroll-mt-28">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <ShoppingBag className="size-4" />
              <span>Commercial Clone Platforms</span>
            </div>
            <h2 className="mt-1 font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Turnkey E-Commerce Clones & Industry Architectures
            </h2>
          </div>
          <Link
            href="/#features"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline sm:text-sm"
          >
            <span>View Homepage Features</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <p className="mt-3 max-w-3xl text-sm text-muted sm:text-base">
          Permanent source code licensing for full-stack e-commerce systems with zero revenue commission.
          Deploy in your private cloud with complete customization freedom.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(SOLUTION_LANDING_PAGES).map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-line bg-page p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    {solution.badge}
                  </span>
                  <Code2 className="size-4 text-muted transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  {solution.h1}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                  {solution.subtitle}
                </p>

                {/* Key features pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {solution.features.slice(0, 3).map((feat) => (
                    <span
                      key={feat.title}
                      className="rounded bg-sunken px-2 py-0.5 text-[11px] font-medium text-ink/70"
                    >
                      {feat.title}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1.5 border-t border-line/60 pt-4 text-xs font-semibold text-accent">
                <span>View architecture & pricing</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section 2: Dedicated Software Engineering & Developer Staffing ── */}
      <section id="developers" className="mt-20 scroll-mt-28">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Users className="size-4" />
              <span>Technical Talent Pods</span>
            </div>
            <h2 className="mt-1 font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Dedicated Software Engineering & Staffing Specializations
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline sm:text-sm"
          >
            <span>All Staffing Models & Guarantees</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <p className="mt-3 max-w-3xl text-sm text-muted sm:text-base">
          Pre-vetted senior engineers onboarded within 48 hours. 1-week risk-free trial, dedicated
          timezone overlap, 0% placement fees, and direct code commits into your private GitHub repositories.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(ROLE_LANDING_PAGES).map((role) => {
            const catalogRole = STAFFING_ROLES.find((r) => r.id === role.roleId);
            return (
              <Link
                key={role.slug}
                href={`/services/${role.slug}`}
                className="group relative flex flex-col justify-between rounded-xl border border-line bg-page p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-sunken px-2 py-0.5 text-[11px] font-medium text-muted">
                      {role.badge}
                    </span>
                    <Cpu className="size-3.5 text-muted transition-colors group-hover:text-accent" />
                  </div>
                  <h3 className="mt-3 font-serif text-base font-medium text-ink transition-colors group-hover:text-accent">
                    {role.h1}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">
                    {role.subtitle}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {role.skillsList.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded bg-accent/5 px-1.5 py-0.5 text-[10px] font-medium text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-line/60 pt-3">
                  {catalogRole ? (
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-muted">From</span>
                      <span className="font-semibold text-ink">
                        {formatMoney(catalogRole.monthlyFullTimeRate)}/mo
                      </span>
                    </div>
                  ) : null}
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-accent">
                    <span>Hire developer</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Section 3: Commercial License Pricing & Packages ── */}
      <section id="pricing" className="mt-20 scroll-mt-28">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Shield className="size-4" />
              <span>Transparent Commercial Tiers</span>
            </div>
            <h2 className="mt-1 font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Permanent Source Code Licensing & Turnkey Packages
            </h2>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline sm:text-sm"
          >
            <span>Open Interactive Quote Calculator</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col justify-between rounded-2xl border border-line bg-page p-6 shadow-sm"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Package Tier
                </span>
                <h3 className="mt-1 font-serif text-xl font-medium text-ink">{pkg.name}</h3>
                <p className="mt-2 text-xs text-muted sm:text-sm">{pkg.blurb}</p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-ink sm:text-3xl">
                    {formatMoney(pkg.setupFee)}
                  </span>
                  <span className="text-xs text-muted">one-time license</span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-accent" />
                    <span>{pkg.launchWeeks} weeks deployment timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-accent" />
                    <span>{pkg.modules.length} integrated platform modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-accent" />
                    <span>100% full source code ownership</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-line/60 pt-4">
                <Link
                  href={`/pricing?pkg=${pkg.id}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <span>Customize & Quote</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Company, Engineering Heritage & Insights ── */}
      <section id="company" className="mt-20 scroll-mt-28">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Building2 className="size-4" />
              <span>Company & Insights</span>
            </div>
            <h2 className="mt-1 font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              About the Platform, Team, and Engineering Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline sm:text-sm"
          >
            <span>Visit Blog Hub</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Company links card */}
          <div className="rounded-2xl border border-line bg-page p-6 shadow-sm">
            <h3 className="font-serif text-lg font-medium text-ink">Core Company Pages</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="group flex items-center justify-between text-muted transition-colors hover:text-ink"
                >
                  <span className="font-medium text-ink group-hover:text-accent">About Dariyo</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-0.5 text-xs text-muted">
                  The engineering story, maritime dry-fish heritage, and vision for merchant sovereignty.
                </p>
              </li>
              <li className="border-t border-line/60 pt-3">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between text-muted transition-colors hover:text-ink"
                >
                  <span className="font-medium text-ink group-hover:text-accent">Contact & Sales</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-0.5 text-xs text-muted">
                  Inquire about enterprise licenses, dedicated hiring, or custom architecture scopes.
                </p>
              </li>
              <li className="border-t border-line/60 pt-3">
                <Link
                  href="/#faqs"
                  className="group flex items-center justify-between text-muted transition-colors hover:text-ink"
                >
                  <span className="font-medium text-ink group-hover:text-accent">Frequently Asked Questions</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-0.5 text-xs text-muted">
                  Licensing rights, zero commissions, cloud infrastructure requirements, and deployment SLAs.
                </p>
              </li>
              <li className="border-t border-line/60 pt-3">
                <a
                  href="https://dariyo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-muted transition-colors hover:text-ink"
                >
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink group-hover:text-accent">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Live Reference Store (dariyo.in)
                  </span>
                  <ExternalLink className="size-3.5 text-muted transition-colors group-hover:text-accent" />
                </a>
                <p className="mt-0.5 text-xs text-muted">
                  Experience the actual production retail & B2B storefront running live in India.
                </p>
              </li>
            </ul>
          </div>

          {/* Dynamic blog articles */}
          <div className="rounded-2xl border border-line bg-page p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-medium text-ink">
                Engineering & Architecture Articles
              </h3>
              <span className="text-xs text-muted">{blogPosts.length} published articles</span>
            </div>

            {blogPosts.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {blogPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-line/60 bg-sunken/40 p-4 transition-all hover:border-accent/40 hover:bg-sunken"
                  >
                    <div>
                      <span className="text-[11px] font-medium text-accent">
                        {post.readingMinutes ? `${post.readingMinutes} min read` : "Engineering Guide"}
                      </span>
                      <h4 className="mt-1 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                        {post.title}
                      </h4>
                      <p className="mt-1.5 line-clamp-2 text-xs text-muted">{post.excerpt}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-accent">
                      <span>Read article</span>
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">
                <FileText className="mx-auto size-8 text-muted/60" />
                <p className="mt-2 font-medium text-ink">Technical articles publishing regularly</p>
                <p className="mt-1 text-xs">
                  Read deep architectural deep-dives on Next.js 16, Razorpay checkout optimization, and B2B workflows on our{" "}
                  <Link href="/blog" className="text-accent underline">
                    Blog Hub
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 5: Machine Endpoints, XML Sitemaps & AI Indexing ── */}
      <section id="machine-feeds" className="mt-20 scroll-mt-28">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
          <Terminal className="size-4" />
          <span>Machine Discovery Protocols</span>
        </div>
        <h2 className="mt-1 font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          Crawler Sitemaps, AI Manifests & Syndication Feeds
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-muted sm:text-base">
          Standardized machine endpoints for search engine spiders (Googlebot, Bingbot), AI foundation models
          (ChatGPT Search, Perplexity, Claude), and browser search engines.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-line bg-page p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <FileCode2 className="size-5 text-accent" />
                <ExternalLink className="size-3.5 text-muted group-hover:text-accent" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink group-hover:text-accent">
                XML Machine Sitemap
              </h3>
              <p className="mt-1 text-xs text-muted">
                Complete XML sitemap with 200+ localized URLs and hreflang annotations for search bots.
              </p>
            </div>
            <code className="mt-4 block font-mono text-[11px] text-accent">/sitemap.xml</code>
          </a>

          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-line bg-page p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <Rss className="size-5 text-amber-500" />
                <ExternalLink className="size-3.5 text-muted group-hover:text-accent" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink group-hover:text-accent">
                RSS / Atom Syndication Feed
              </h3>
              <p className="mt-1 text-xs text-muted">
                Live RSS feed of technical articles and platform releases for aggregators and readers.
              </p>
            </div>
            <code className="mt-4 block font-mono text-[11px] text-accent">/feed.xml</code>
          </a>

          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-line bg-page p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <Bot className="size-5 text-emerald-500" />
                <ExternalLink className="size-3.5 text-muted group-hover:text-accent" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink group-hover:text-accent">
                LLMs / AI Context Manifest
              </h3>
              <p className="mt-1 text-xs text-muted">
                Authoritative platform specs formatted for Perplexity, ChatGPT, Claude, and Copilot.
              </p>
            </div>
            <code className="mt-4 block font-mono text-[11px] text-accent">/llms.txt</code>
          </a>

          <a
            href="/opensearch.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-line bg-page p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <Search className="size-5 text-indigo-500" />
                <ExternalLink className="size-3.5 text-muted group-hover:text-accent" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink group-hover:text-accent">
                OpenSearch XML Descriptor
              </h3>
              <p className="mt-1 text-xs text-muted">
                Browser autodiscovery definition enabling native browser search and Sitelinks Searchbox.
              </p>
            </div>
            <code className="mt-4 block font-mono text-[11px] text-accent">/opensearch.xml</code>
          </a>
        </div>
      </section>

      {/* Internal Links Cluster at the bottom */}
      <div className="mt-20 border-t border-line/60 pt-12">
        <InternalLinksCluster />
      </div>
    </div>
  );
}
