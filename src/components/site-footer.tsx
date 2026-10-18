import Link from "next/link";

import { BrandMark } from "@/components/site-header";
import { site } from "@/config/site";
import { LICENCE } from "@/data/catalog";

export function SiteFooter() {
  const whatsapp = site.whatsapp.replace(/\D/g, "");
  return (
    <footer className="mt-24 border-t border-line print:hidden">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-semibold">
            <BrandMark className="size-7" />
            {site.name}
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">{LICENCE}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-muted">
            <li>
              <Link href="/#features" className="hover:text-ink">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#technology" className="hover:text-ink">
                Technology
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-ink">
                Pricing
              </Link>
            </li>
            {site.showcase.enabled ? (
              <li>
                <a href={site.showcase.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  Live store: {site.showcase.name}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Talk to us</p>
          <ul className="mt-3 space-y-2 text-muted">
            {whatsapp ? (
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  WhatsApp
                </a>
              </li>
            ) : null}
            {site.email ? (
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/pricing" className="hover:text-ink">
                Get a quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-10 text-xs text-muted sm:px-6">
        Prices in Indian rupees. © {site.name}
      </p>
    </footer>
  );
}
