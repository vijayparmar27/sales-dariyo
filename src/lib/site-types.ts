/**
 * What the sales site reads from the API's `/sales-site/public/*` routes
 * (dryfish-backend `modules/salesSite`). The pages are laid over their
 * defaults by the API, so every field is always there; a post's body comes
 * parsed, as a tree of blocks, never as HTML.
 */

export type Inline =
  | { t: "text"; v: string }
  | { t: "strong"; c: Inline[] }
  | { t: "em"; c: Inline[] }
  | { t: "code"; v: string }
  | { t: "link"; href: string; c: Inline[] }
  | { t: "br" };

export type Block =
  | { type: "heading"; level: 2 | 3; id: string; content: Inline[] }
  | { type: "paragraph"; content: Inline[] }
  | { type: "list"; ordered: boolean; start: number; items: Inline[][] }
  | { type: "quote"; content: Inline[] }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "code"; lang: string; text: string }
  | { type: "divider" };

export interface PageLink {
  label: string;
  href: string;
}

export interface PageImage {
  src: string;
  alt: string;
}

export interface Seo {
  title: string;
  description: string;
}

/** A `*word*` in a heading is set in italics (`<Accent>`). */
export interface SectionHead {
  eyebrow: string;
  heading: string;
  intro: string;
}

export type ValueIcon =
  | "shield"
  | "rocket"
  | "layers"
  | "store"
  | "truck"
  | "receipt"
  | "chart"
  | "users"
  | "headset"
  | "code"
  | "sparkles"
  | "lock"
  | "globe"
  | "zap"
  | "heart"
  | "award";

export type SocialPlatform = "linkedin" | "x" | "instagram" | "facebook" | "youtube" | "github" | "website";

export type ContactField = "name" | "email" | "phone" | "company" | "topic" | "message";

export interface AboutPage {
  seo: Seo;
  hero: SectionHead & { primary: PageLink; secondary: PageLink; images: PageImage[] };
  story: { visible: boolean; eyebrow: string; statement: string; stats: { value: string; label: string }[]; images: PageImage[] };
  values: SectionHead & { visible: boolean; items: { icon: ValueIcon; title: string; text: string }[]; cta: PageLink };
  team: SectionHead & {
    visible: boolean;
    members: { name: string; role: string; photo: string; bio: string; link: string }[];
  };
  testimonials: SectionHead & { visible: boolean; items: { quote: string; name: string; role: string; photo: string }[] };
  blog: SectionHead & { visible: boolean };
  cta: SectionHead & { visible: boolean; primary: PageLink; secondary: PageLink };
}

export interface ContactFieldSettings {
  label: string;
  placeholder: string;
  enabled: boolean;
  required: boolean;
}

export interface ContactChannels {
  email: string;
  phone: string;
  /** Digits with the country code, as wa.me takes them. */
  whatsapp: string;
  address: string;
  hours: string;
  mapUrl: string;
}

export interface ContactPage {
  seo: Seo;
  hero: SectionHead;
  channels: ContactChannels;
  socials: { platform: SocialPlatform; url: string }[];
  form: {
    fields: Record<ContactField, ContactFieldSettings>;
    topics: string[];
    submitLabel: string;
    successTitle: string;
    successMessage: string;
    note: string;
  };
}

export interface BlogPage {
  seo: Seo;
  hero: SectionHead & { searchPlaceholder: string };
  featured: { visible: boolean; heading: string };
  latest: SectionHead & { emptyText: string };
  related: SectionHead;
  categories: { slug: string; name: string }[];
  authors: { id: string; name: string; role: string; avatar: string; bio: string }[];
  cta: SectionHead & { visible: boolean; primary: PageLink; secondary: PageLink };
}

export interface PageContents {
  about: AboutPage;
  contact: ContactPage;
  blog: BlogPage;
}

export type PageKey = keyof PageContents;

export interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  category: { slug: string; name: string } | null;
  tags: string[];
  author: { name: string; role: string; avatar: string } | null;
  featured: boolean;
  publishedAt: string;
  updatedAt: string | null;
  readingMinutes: number;
}

export interface Post extends Omit<PostCard, "author"> {
  author: { name: string; role: string; avatar: string; bio: string } | null;
  blocks: Block[];
  toc: { id: string; text: string; level: 2 | 3 }[];
  wordCount: number;
  seo: Seo;
}

/** A picture resolved on the server: where to load it from, and whether Next may optimise it. */
export interface SiteImageSource {
  src: string;
  optimise: boolean;
}

/** A post card as the client-side blog list gets it: pictures already resolved. */
export interface PostCardView extends Omit<PostCard, "author"> {
  image: SiteImageSource | null;
  author: { name: string; role: string; avatar: SiteImageSource | null } | null;
}
