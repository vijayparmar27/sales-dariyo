import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { ScrollObserver } from "@/components/animation/scroll-observer";
import { ScrollProgressBar } from "@/components/animation/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { I18nProvider } from "@/lib/i18n/context";
import { getServerI18n } from "@/lib/i18n/server";
import { getContactChannels } from "@/lib/site-api";

import "./globals.css";

import { buildOrganizationJsonLd, buildWebSiteJsonLd, serializeJsonLd } from "@/lib/seo";

// latin-ext as well as latin: the rupee sign (U+20B9) is only in latin-ext,
// and without it every price on the site falls back to the system font.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// The display face for headings, after the condensed serif on the Catalis
// reference. Prices stay in Inter: this face has no rupee sign.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url || "https://solutions.dariyo.in"),
  title: {
    default: `${site.name} — ${site.product} | Permanent Source Code License`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "commerce platform source code",
    "ecommerce source code license",
    "buy ecommerce platform source code",
    "next.js ecommerce platform",
    "react admin panel template",
    "b2b wholesale portal software",
    "self hosted ecommerce platform",
    "retail and wholesale ecommerce script",
    "hire dedicated nextjs developers",
    "custom ecommerce engineering India",
    "zero commission ecommerce platform",
  ],
  authors: [{ name: site.name, url: site.url || "https://solutions.dariyo.in" }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_IN"],
    siteName: `${site.name} ${site.product}`,
    title: `${site.name} — ${site.product} | Permanent Source Code License`,
    description: site.description,
    url: site.url || "https://solutions.dariyo.in",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.product} | Permanent Source Code License`,
    description: site.description,
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.YANDEX_VERIFICATION && {
      yandex: process.env.YANDEX_VERIFICATION,
    }),
    ...(process.env.BING_SITE_VERIFICATION && {
      other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION },
    }),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [channels, { lang, currency, country, dir }] = await Promise.all([
    getContactChannels(),
    getServerI18n(),
  ]);

  const orgJsonLd = serializeJsonLd(buildOrganizationJsonLd());
  const websiteJsonLd = serializeJsonLd(buildWebSiteJsonLd());

  return (
    // data-scroll-behavior: globals.css scrolls smoothly for in-page anchors,
    // and Next 16 no longer turns that off for page changes unless told to,
    // so opening /pricing from the bottom of the home page animated all the
    // way up through the new page.
    <html
      lang={lang}
      dir={dir}
      className={cn("light", inter.variable, instrumentSerif.variable)}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* DNS lookups for third-party assets and API host */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://nykjiswkyyqqfvbfseke.supabase.co" />

        {/* Geo & market coverage targeting */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />

        {/* Mobile & Web App optimization */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Structured Data: Organization & WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgJsonLd }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
        />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <ScrollProgressBar />
        <ScrollObserver />
        <I18nProvider initialLang={lang} initialCurrency={currency} initialCountry={country}>
          <SiteHeader channels={channels} />
          <main>{children}</main>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
