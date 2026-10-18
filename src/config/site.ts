/**
 * Who is selling. Everything a buyer reads about the seller — the name, how to
 * reach them, the store they can see running — comes from here, so rebranding
 * the site is an edit to this file.
 *
 * A contact field left empty hides the button that needs it: a WhatsApp button
 * with no number opens a chat with nobody, and a buyer who taps it and gets
 * nowhere does not try a second time.
 */
export interface SiteConfig {
  /** The seller: shown in the header, the footer and every page title. */
  name: string;
  /** What is for sale, as a short noun phrase. */
  product: string;
  description: string;
  /**
   * The site's address, e.g. "https://yourcompany.in", used for the link in a
   * sent quote. Set it in production: left empty, the link uses whatever
   * address the page was opened on, which is right on localhost and preview
   * deployments but comes from the request's Host header.
   */
  url: string;
  /** WhatsApp number as digits with the country code and no "+", e.g. "919876543210". */
  whatsapp: string;
  email: string;
  /**
   * The store this platform already runs. Shown as the live example on the
   * home page and in the footer. Name a client only with their agreement; with
   * `enabled: false` the site never mentions them.
   */
  showcase: {
    enabled: boolean;
    name: string;
    url: string;
    line: string;
  };
}

export const site: SiteConfig = {
  name: "Your Company",
  product: "Commerce Platform",
  description:
    "Your own online store, wholesale portal and admin panel, licensed to your brand and set up on your servers.",
  url: "",
  whatsapp: "",
  email: "",
  showcase: {
    enabled: true,
    name: "Dariyo",
    url: "https://dariyo.in",
    line: "Dry fish, sold retail and wholesale",
  },
};

/**
 * The address shown in the mock browser bars on the home page: the live
 * store's domain while the showcase is on, and a neutral placeholder when it
 * is off, so switching the showcase off really does stop naming the client.
 */
export function demoAddress(): string {
  if (site.showcase.enabled) {
    try {
      const host = new URL(site.showcase.url).hostname;
      return host.startsWith("www.") ? host : `www.${host}`;
    } catch {
      // A malformed showcase URL falls through to the placeholder.
    }
  }
  return "www.yourstore.in";
}
