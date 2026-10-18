import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.product} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior: globals.css scrolls smoothly for in-page anchors,
    // and Next 16 no longer turns that off for page changes unless told to,
    // so opening /pricing from the bottom of the home page animated all the
    // way up through the new page.
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body className="min-h-dvh font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
