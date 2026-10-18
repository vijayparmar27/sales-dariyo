import { ArrowUpRight, ExternalLink, Mail, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/site-header";
import { site } from "@/config/site";
import { LICENCE } from "@/data/catalog";

export function SiteFooter() {
  const whatsappDigits = site.whatsapp.replace(/\D/g, "");
  const showcase = site.showcase.enabled ? site.showcase : null;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-line/80 bg-sunken/40 print:hidden transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 font-bold tracking-tight text-ink">
                <BrandMark className="size-8" />
                <span className="text-lg">
                  {site.name}
                  <span className="block text-xs font-normal text-muted">{site.product}</span>
                </span>
              </Link>
              <p className="mt-4 max-w-sm text-sm text-pretty text-muted leading-relaxed">
                The ready-built, production-hardened e-commerce engine designed for packaged food, beverage, and consumer brands that sell retail and wholesale.
              </p>
              <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-line bg-card p-3.5 text-xs text-muted">
                <Shield className="size-4 shrink-0 text-accent-ink mt-0.5" />
                <span>
                  <strong>Full code ownership:</strong> {LICENCE}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-wider text-ink">Platform</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/#features" className="transition-colors hover:text-ink">
                  Platform Features
                </Link>
              </li>
              <li>
                <Link href="/#apps" className="transition-colors hover:text-ink">
                  3 Connected Applications
                </Link>
              </li>
              <li>
                <Link href="/#modules" className="transition-colors hover:text-ink">
                  Customizable Add-ons
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="transition-colors hover:text-ink">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#technology" className="transition-colors hover:text-ink">
                  Technology Stack
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="transition-colors hover:text-ink">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial & Pricing */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-ink">Investment</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/pricing?p=starter" className="transition-colors hover:text-ink">
                  Starter Package (₹1.75L)
                </Link>
              </li>
              <li>
                <Link href="/pricing?p=growth" className="transition-colors hover:text-ink">
                  Growth Package (₹3.10L)
                </Link>
              </li>
              <li>
                <Link href="/pricing?p=complete" className="transition-colors hover:text-ink">
                  Complete Package (₹7.10L)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-flex items-center gap-1 font-medium text-ink hover:underline">
                  Live Price Builder
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Live Showcase */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-wider text-ink">Connect & Showcase</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {showcase ? (
                <li>
                  <a
                    href={showcase.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-line bg-card p-3 transition-colors hover:border-ink/20"
                  >
                    <div>
                      <p className="font-semibold text-ink group-hover:text-accent-ink">
                        Live Store: {showcase.name}
                      </p>
                      <p className="text-xs text-muted">{showcase.line}</p>
                    </div>
                    <ExternalLink className="size-4 text-muted group-hover:text-ink" />
                  </a>
                </li>
              ) : null}

              {whatsappDigits ? (
                <li>
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-ink transition-colors"
                  >
                    <MessageCircle className="size-4 text-emerald-600" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </li>
              ) : null}

              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 hover:text-ink transition-colors"
                  >
                    <Mail className="size-4" />
                    <span>{site.email}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Bottom Line & Legal */}
        <div className="mt-14 border-t border-line/80 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted">
          <p>© {currentYear} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Prices quoted in Indian Rupees (INR) before GST.</span>
            <span>·</span>
            <span>Permanent Software License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
