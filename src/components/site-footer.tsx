import { ArrowUpRight, Mail, MessageCircle, Phone, Shield } from "lucide-react";
import Link from "next/link";

import { socialOf } from "@/components/content/social-icon";
import { BrandLogo } from "@/components/site-header";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { site } from "@/config/site";
import { packageFigures } from "@/lib/packages";
import { getServerI18n } from "@/lib/i18n/server";
import { getContactChannels, getPage } from "@/lib/site-api";

export async function SiteFooter() {
  const [channels, contact, { formatMoney, t }] = await Promise.all([
    getContactChannels(),
    getPage("contact"),
    getServerI18n(),
  ]);
  const whatsappDigits = channels.whatsapp;
  const showcase = site.showcase.enabled ? site.showcase : null;
  const currentYear = new Date().getFullYear();
  const packages = packageFigures();
  const wordmarkSize = `min(${(165 / Math.max(site.name.length, 6)).toFixed(2)}vw, 15rem)`;

  const platformLinks = [
    { href: "/#features", label: t.nav.features },
    { href: "/#demo", label: t.footer.links.liveDemo },
    { href: "/#apps", label: t.footer.links.apps },
    { href: "/#retail-wholesale", label: t.footer.links.retailWholesale },
    { href: "/#admin-console", label: t.footer.links.adminPanel },
    { href: "/#immersive", label: t.footer.links.immersive },
    { href: "/#modules", label: t.footer.links.addOnModules },
    { href: "/#technology", label: t.footer.links.technology },
  ];

  const companyLinks = [
    { href: "/about", label: t.footer.links.aboutUs },
    { href: "/blog", label: t.footer.links.blog },
    { href: "/contact", label: t.footer.links.contact },
    { href: "/sitemap", label: "Sitemap" },
    { href: "/#faqs", label: t.footer.links.faq },
  ];

  const servicesLinks = [
    { href: "/services", label: t.footer.links.overviewPackages },
    { href: "/services#developers", label: t.footer.links.hireDevelopers },
    { href: "/services", label: t.footer.links.webApps },
    { href: "/services", label: t.footer.links.mobileApps },
    { href: "/services", label: t.footer.links.apis },
  ];

  return (
    <footer className="overflow-hidden print:hidden">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-3">
            <Link href="/" className="inline-flex items-center gap-3 text-ink">
              <BrandLogo className="h-8 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-pretty text-muted">
              {t.footer.platformSummary}
            </p>
            <div className="mt-6 flex max-w-md items-start gap-3 rounded-2xl bg-sunken p-4 text-xs leading-relaxed text-muted">
              <Shield aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-blue" />
              <span>
                <strong className="font-medium text-ink">{t.footer.licenseLabel}</strong> {t.catalog.licence}
              </span>
            </div>
          </div>

          <nav aria-label={t.footer.platform} className="col-span-1 lg:col-span-2">
            <p className="text-sm font-medium text-ink">{t.footer.platform}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.services} className="col-span-1 lg:col-span-2">
            <p className="text-sm font-medium text-ink">{t.footer.services}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-1 lg:col-span-2">
            <p className="text-sm font-medium text-ink">{t.footer.clonePricing}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {packages.map((pkg) => {
                const localizedName = t.catalog.packages[pkg.id]?.name || pkg.name;
                return (
                  <li key={pkg.id}>
                    <Link href={`/pricing?pkg=${pkg.id}`} className="transition-colors hover:text-ink">
                      {localizedName} <span className="tabular-nums">· {formatMoney(pkg.setupFee)}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/pricing" className="inline-flex items-center gap-1 font-medium text-ink hover:underline">
                  {t.footer.priceBuilderLink}
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <p className="text-sm font-medium text-ink">{t.footer.companyContact}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-3 text-sm text-muted border-t border-line/60 pt-4">
              {showcase ? (
                <li>
                  <a
                    href={showcase.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 transition-colors hover:text-ink"
                  >
                    <span className="size-2 rounded-full bg-emerald-500" />
                    {t.nav.seeLiveAt || "Live store"}: {showcase.name}
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
                    {t.nav.chatWhatsApp}
                  </a>
                </li>
              ) : null}
              {channels.email ? (
                <li>
                  <a href={`mailto:${channels.email}`} className="inline-flex items-center gap-2 break-words transition-colors hover:text-ink">
                    <Mail aria-hidden className="size-4 shrink-0" />
                    {channels.email}
                  </a>
                </li>
              ) : null}
              {channels.phone ? (
                <li>
                  <a href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                    <Phone aria-hidden className="size-4 shrink-0" />
                    {channels.phone}
                  </a>
                </li>
              ) : null}
            </ul>
            {contact.socials.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Elsewhere">
                {contact.socials.map(({ platform, url }) => {
                  const { label, icon: Icon } = socialOf(platform);
                  return (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex size-9 items-center justify-center rounded-full bg-sunken text-ink/70 transition-colors hover:text-ink"
                      >
                        <Icon aria-hidden className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {site.name}. {t.footer.allRightsReserved}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p>
              {t.footer.noCommission}
            </p>
            <LocaleSwitcher />
          </div>
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
