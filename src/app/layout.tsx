import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { I18nProvider } from "@/lib/i18n/context";
import { getServerI18n } from "@/lib/i18n/server";
import { getContactChannels } from "@/lib/site-api";

import "./globals.css";

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
  title: {
    default: `${site.product} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // Makes the pages' canonical links absolute once the domain is set; until
  // then they stay relative, which search engines still accept.
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [channels, { lang, currency, country, dir }] = await Promise.all([
    getContactChannels(),
    getServerI18n(),
  ]);

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
      <body className="min-h-dvh font-sans antialiased">
        <I18nProvider initialLang={lang} initialCurrency={currency} initialCountry={country}>
          <SiteHeader channels={channels} />
          <main>{children}</main>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
