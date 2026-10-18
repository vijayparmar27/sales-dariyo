import { ArrowUpRight, Mail, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/site-header";
import { site } from "@/config/site";
import { LICENCE } from "@/data/catalog";
import { rupees } from "@/lib/format";
import { packageFigures } from "@/lib/packages";

const PLATFORM_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#demo", label: "Live demo" },
  { href: "/#apps", label: "Three connected apps" },
  { href: "/#retail-wholesale", label: "Retail and wholesale" },
  { href: "/#admin-console", label: "Admin panel" },
  { href: "/#immersive", label: "3D and media" },
  { href: "/#modules", label: "Add-on modules" },
  { href: "/#technology", label: "Technology" },
  { href: "/#faqs", label: "FAQ" },
];

export function SiteFooter() {
  const whatsappDigits = site.whatsapp.replace(/\D/g, "");
  const showcase = site.showcase.enabled ? site.showcase : null;
  const currentYear = new Date().getFullYear();
  // Package prices from the catalogue. These links used `?p=`, which the
  // pricing page never read, so every one of them opened the default package.
  const packages = packageFigures();
  // Sized to the name, so a long company name still fits on one line.
  const wordmarkSize = `min(${(165 / Math.max(site.name.length, 6)).toFixed(2)}vw, 15rem)`;

  return (
    <footer className="overflow-hidden print:hidden">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 text-ink">
              <BrandMark className="size-9" />
              <span className="font-serif text-3xl leading-none tracking-[-0.01em]">{site.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-pretty text-muted">
              A ready-built commerce platform for packaged food, drink and consumer brands that sell
              retail and wholesale.
            </p>
            <div className="mt-6 flex max-w-md items-start gap-3 rounded-2xl bg-sunken p-4 text-xs leading-relaxed text-muted">
              <Shield aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-blue" />
              <span>
                <strong className="font-medium text-ink">The licence:</strong> {LICENCE}
              </span>
            </div>
          </div>

          <nav aria-label="Platform" className="col-span-1 lg:col-span-3">
            <p className="text-sm font-medium text-ink">Platform</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-1 lg:col-span-2">
            <p className="text-sm font-medium text-ink">Pricing</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <Link href={`/pricing?pkg=${pkg.id}`} className="transition-colors hover:text-ink">
                    {pkg.name} <span className="tabular-nums">· {rupees(pkg.setupFee)}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pricing" className="inline-flex items-center gap-1 font-medium text-ink hover:underline">
                  Price builder
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <p className="text-sm font-medium text-ink">Get in touch</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {showcase ? (
                <li>
                  <a
                    href={showcase.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 transition-colors hover:text-ink"
                  >
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Live store: {showcase.name}
                    <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ) : null}
              {whatsappDigits ? (
                <li>
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                  >
                    <MessageCircle aria-hidden className="size-4 text-emerald-600" />
                    Chat on WhatsApp
                  </a>
                </li>
              ) : null}
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                    <Mail aria-hidden className="size-4" />
                    {site.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <p>Prices in Indian rupees, before GST · Permanent software licence</p>
        </div>

        {/* The reference's oversized italic wordmark, clipped by the page's end */}
        <p
          aria-hidden="true"
          className="mt-10 mb-[-0.2em] text-center font-serif leading-none tracking-[-0.04em] whitespace-nowrap text-ink italic select-none"
          style={{ fontSize: wordmarkSize }}
        >
          {site.name}
        </p>
      </div>
    </footer>
  );
}
