import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
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
  const channels = await getContactChannels();

  return (
    // data-scroll-behavior: globals.css scrolls smoothly for in-page anchors,
    // and Next 16 no longer turns that off for page changes unless told to,
    // so opening /pricing from the bottom of the home page animated all the
    // way up through the new page.
    <html
      lang="en-IN"
      className={cn("light", inter.variable, instrumentSerif.variable)}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-dvh font-sans antialiased">
        <SiteHeader channels={channels} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
