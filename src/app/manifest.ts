import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Web app manifest for PWA installation and mobile browser experience.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.product}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0284c7",
    categories: ["business", "productivity", "shopping"],
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Pricing & Packages",
        short_name: "Pricing",
        url: "/pricing",
      },
      {
        name: "Software Engineering & Services",
        short_name: "Services",
        url: "/services",
      },
      {
        name: "Engineering Blog",
        short_name: "Blog",
        url: "/blog",
      },
      {
        name: "Contact & Inquiries",
        short_name: "Contact",
        url: "/contact",
      },
    ],
  };
}
