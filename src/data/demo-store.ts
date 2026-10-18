/**
 * The store the home page's demos show.
 *
 * While the showcase is on (`site.showcase.enabled`), that is Dariyo, the
 * store this platform already runs: its logo, product photos, 3D renders,
 * copy and shop prices, copied from dariyo.in on 18 October 2026. The images
 * live in `src/assets/dariyo/`, because the site loads nothing from other
 * origins (see next.config.ts), and the copy is a snapshot: the sales site
 * never calls the Dariyo API.
 *
 * With the showcase off, the demos fall back to North & Nourish, a fictional
 * brand, so switching the showcase off really does stop naming the client.
 *
 * Nothing here may put an invented figure next to a real business: Dariyo's
 * products carry no star ratings or review counts, the sample orders are
 * labelled as samples where they are shown, and wholesale rates are examples
 * (its trade prices are not public).
 */
import type { CSSProperties } from "react";
import type { StaticImageData } from "next/image";

import bombayDuck3d from "@/assets/dariyo/bombay-duck-3d.webp";
import bombayDuckCloseup from "@/assets/dariyo/bombay-duck-closeup.jpg";
import bombayDuckFront from "@/assets/dariyo/bombay-duck-front.jpg";
import dariyoMark from "@/assets/dariyo/dariyo-mark.png";
import goldenAnchoviesFront from "@/assets/dariyo/golden-anchovies-front.jpg";
import pomfret3d from "@/assets/dariyo/pomfret-3d.webp";
import pomfretBeside from "@/assets/dariyo/pomfret-beside.jpg";
import pomfretCloseup from "@/assets/dariyo/pomfret-closeup.jpg";
import pomfretFront from "@/assets/dariyo/pomfret-front.jpg";
import pomfretInside from "@/assets/dariyo/pomfret-inside.jpg";
import pomfretVideo from "@/assets/dariyo/pomfret-video.webp";
import tinyShrimp3d from "@/assets/dariyo/tiny-shrimp-3d.webp";
import tinyShrimpFront from "@/assets/dariyo/tiny-shrimp-front.jpg";
import { site } from "@/config/site";

export interface DemoImage {
  src: StaticImageData;
  alt: string;
}

export interface DemoPackSize {
  id: string;
  label: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  /** Shipping weight of one pack, packaging included. */
  weightGrams: number;
}

export type DemoArt = "coffee" | "spices" | "cocoa";

export interface DemoProduct {
  id: string;
  name: string;
  /** One line under the name. */
  tagline: string;
  categoryLabel: string;
  description: string;
  /** A few short points shown as chips: tasting notes, or nutrition. */
  highlights: string[];
  provenance: string;
  packSizes: DemoPackSize[];
  /** A real photo. Products without one are drawn from `art`. */
  photo?: DemoImage;
  /** More photos, for the swipeable phone gallery. */
  gallery?: DemoImage[];
  /** A render of the product's 3D model. */
  model3d?: DemoImage;
  art?: DemoArt;
  /** Fictional brand only: never invent a rating for a real store. */
  rating?: { value: number; count: number };
  /** The product's page on the live store. */
  url?: string;
}

export interface DemoOrder {
  id: string;
  time: string;
  customer: string;
  location: string;
  items: string;
  total: number;
  paymentMethod: string;
  paymentStatus: "PAID" | "PENDING_COD" | "PARTIAL_PAID";
  fulfillmentStatus: "CONFIRMED" | "PACKED" | "DISPATCHED";
  courier: string;
  awb: string;
}

export interface DemoStore {
  brand: {
    name: string;
    tagline: string;
    mark?: StaticImageData;
    /** A real store: the demos say so, and link to it. */
    live: boolean;
  };
  /** The storefront mock-ups are drawn in the brand's own colours. */
  theme: { ink: string; inkHover: string; surface: string; line: string; accent: string };
  products: DemoProduct[];
  orders: DemoOrder[];
  /** GST on the products, in percent. */
  gstPercent: number;
  /** Prefix of the sample order numbers. */
  orderPrefix: string;
  /** For the wholesale simulator: what a trade buyer orders by the kg. */
  wholesale: {
    product: string;
    /** Minimum quantities and example rates per kg, before GST. */
    tiers: { minKg: number; ratePerKg: number }[];
    retailPerKg: number;
  };
  /** The sample trade buyer. The GSTIN uses the standard example PAN, ABCDE1234F. */
  tradeBuyer: { name: string; city: string; gstin: string };
  /** Pickup addresses the courier collects from (stock is one count per pack). */
  warehouses: string[];
  /** A small retail basket for the checkout simulator. */
  basket: { productId: string; packId: string; qty: number }[];
  /** The tub, pouch or box the products ship in, for short labels. */
  packNoun: string;
}

// ---------------------------------------------------------------------------
// Dariyo: the live store (snapshot of dariyo.in, 18 October 2026)
// ---------------------------------------------------------------------------

const MADE_IN = "Made by Dariyo in Una, Gir Somnath, Gujarat";

const DARIYO: DemoStore = {
  brand: {
    name: "Dariyo",
    tagline: "Dry fish, sold retail and wholesale",
    mark: dariyoMark,
    live: true,
  },
  theme: {
    ink: "#023E8A",
    inkHover: "#03045E",
    surface: "#F0F7FB",
    line: "#D3E6F3",
    accent: "#0077B6",
  },
  products: [
    {
      id: "pomfret",
      name: "Pomfret Dry Fish",
      tagline: "Whole silver pomfret, dried head on",
      categoryLabel: "Whole sun-dried",
      description:
        "Silver pomfret, paplet, dried whole with the head on, with only salt added. It keeps its fine, white flesh and has few bones to pick around. Rinse, soak briefly, then shallow-fry in a masala crust or add to a curry.",
      highlights: ["50–60 g protein per 100 g", "200–300 mg calcium per 100 g", "Just fish and salt"],
      provenance: MADE_IN,
      packSizes: [
        { id: "50g", label: "50g tub", price: 99, compareAtPrice: 399, sku: "PF-50G", weightGrams: 110 },
        { id: "100g", label: "100g tub", price: 149, compareAtPrice: 499, sku: "PF-100G", weightGrams: 160 },
      ],
      photo: { src: pomfretFront, alt: "Dariyo Pomfret Dry Fish tub, front label" },
      gallery: [
        { src: pomfretFront, alt: "Dariyo Pomfret Dry Fish tub, front label" },
        { src: pomfretBeside, alt: "Whole dried pomfret beside the tub" },
        { src: pomfretInside, alt: "Dried pomfret vacuum sealed inside the tub" },
        { src: pomfretCloseup, alt: "Close-up of dried pomfret" },
        { src: pomfretVideo, alt: "Pomfret Dry Fish product video" },
      ],
      model3d: { src: pomfret3d, alt: "3D model of the Pomfret Dry Fish tub" },
      url: "https://dariyo.in/products/pomfret-dry-fish",
    },
    {
      id: "bombay-duck",
      name: "Bombay Duck Dry Fish",
      tagline: "Whole bombil, dried head on",
      categoryLabel: "Whole sun-dried",
      description:
        "Bombay duck, bombil, dried whole with the head on and nothing added but salt. It is light and crisps quickly: fry it until the edges blister, or break it into a coconut or onion-tomato curry.",
      highlights: ["60.7–76.9 g protein per 100 g", "1,389–1,475 mg calcium per 100 g", "Just fish and salt"],
      provenance: MADE_IN,
      packSizes: [
        { id: "50g", label: "50g tub", price: 99, compareAtPrice: 349, sku: "BD-50G", weightGrams: 110 },
        { id: "100g", label: "100g tub", price: 149, compareAtPrice: 499, sku: "BD-100G", weightGrams: 160 },
      ],
      photo: { src: bombayDuckFront, alt: "Dariyo Bombay Duck Dry Fish tub, front label" },
      gallery: [
        { src: bombayDuckFront, alt: "Dariyo Bombay Duck Dry Fish tub, front label" },
        { src: bombayDuckCloseup, alt: "Dariyo Bombay Duck Dry Fish on a kitchen counter" },
      ],
      model3d: { src: bombayDuck3d, alt: "3D model of the Bombay Duck Dry Fish tub" },
      url: "https://dariyo.in/products/bombay-duck-dry-fish",
    },
    {
      id: "golden-anchovies",
      name: "Golden Anchovies Dry Fish",
      tagline: "Whole golden anchovies, head on",
      categoryLabel: "Whole sun-dried",
      description:
        "Golden anchovy, mandeli, dried whole with the head on, with only salt added. Small enough to fry and eat whole: a fistful in hot oil crisps through in a couple of minutes.",
      highlights: ["60–65 g protein per 100 g", "1,000–1,500 mg calcium per 100 g", "Just fish and salt"],
      provenance: MADE_IN,
      packSizes: [
        { id: "50g", label: "50g tub", price: 99, compareAtPrice: 249, sku: "GA-50G", weightGrams: 110 },
        { id: "100g", label: "100g tub", price: 149, compareAtPrice: 399, sku: "GA-100G", weightGrams: 160 },
      ],
      photo: { src: goldenAnchoviesFront, alt: "Dariyo Golden Anchovies Dry Fish tub, front label" },
      url: "https://dariyo.in/products/golden-anchovies-dry-fish",
    },
    {
      id: "tiny-shrimp",
      name: "Tiny Shrimp Dry Fish",
      tagline: "Tiny whole shrimp, jawla",
      categoryLabel: "Dried prawns & shrimp",
      description:
        "Tiny shrimp, jawla or karandi, dried whole with only salt added. Small enough to cook straight from the tub, with nothing to peel or clean: toss a handful into a bhaji, a chutney or a pulao.",
      highlights: ["46–56 g protein per 100 g", "300–360 mg calcium per 100 g", "Just shrimp and salt"],
      provenance: MADE_IN,
      packSizes: [
        { id: "50g", label: "50g tub", price: 99, compareAtPrice: 299, sku: "TS-50G", weightGrams: 110 },
        { id: "100g", label: "100g tub", price: 149, compareAtPrice: 399, sku: "TS-100G", weightGrams: 160 },
      ],
      photo: { src: tinyShrimpFront, alt: "Dariyo Tiny Shrimp Dry Fish tub, front label" },
      model3d: { src: tinyShrimp3d, alt: "3D model of the Tiny Shrimp Dry Fish tub" },
      url: "https://dariyo.in/products/tiny-shrimp-dry-fish",
    },
  ],
  orders: [
    {
      id: "DR-1042",
      time: "2 minutes ago",
      customer: "Priya Desai",
      location: "Andheri West, Mumbai",
      items: "Pomfret Dry Fish 100g × 2, Tiny Shrimp 50g × 1",
      total: 397,
      paymentMethod: "Razorpay UPI",
      paymentStatus: "PAID",
      fulfillmentStatus: "CONFIRMED",
      courier: "Delhivery Surface",
      awb: "",
    },
    {
      id: "DR-1041",
      time: "14 minutes ago",
      customer: "Rahul Patil",
      location: "Shahupuri, Kolhapur",
      items: "Bombay Duck Dry Fish 100g × 3",
      total: 447,
      paymentMethod: "Razorpay Card",
      paymentStatus: "PAID",
      fulfillmentStatus: "PACKED",
      courier: "Delhivery Express",
      awb: "DL9482103981",
    },
    {
      id: "DR-1040",
      time: "48 minutes ago",
      customer: "Sneha Nair",
      location: "Edappally, Kochi",
      items: "Golden Anchovies Dry Fish 100g × 2",
      total: 298,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "PENDING_COD",
      fulfillmentStatus: "CONFIRMED",
      courier: "Delhivery Surface",
      awb: "",
    },
    {
      id: "DR-B2B-12",
      time: "1 hour ago",
      customer: "Coastal Kitchen (trade buyer)",
      location: "Athwa, Surat",
      items: "Bombay Duck, 25 kg wholesale",
      total: 26250,
      paymentMethod: "Bank transfer (50% advance)",
      paymentStatus: "PARTIAL_PAID",
      fulfillmentStatus: "DISPATCHED",
      courier: "Delhivery B2B Freight",
      awb: "DL-B2B-849201",
    },
  ],
  gstPercent: 5,
  orderPrefix: "DR",
  wholesale: {
    product: "Bombay Duck Dry Fish",
    tiers: [
      { minKg: 10, ratePerKg: 1150 },
      { minKg: 25, ratePerKg: 1050 },
      { minKg: 50, ratePerKg: 950 },
    ],
    retailPerKg: 1490,
  },
  tradeBuyer: { name: "Coastal Kitchen", city: "Surat, GJ", gstin: "24ABCDE1234F1Z5" },
  warehouses: ["Una, Gujarat"],
  basket: [
    { productId: "pomfret", packId: "100g", qty: 2 },
    { productId: "tiny-shrimp", packId: "50g", qty: 1 },
  ],
  packNoun: "tub",
};

// ---------------------------------------------------------------------------
// North & Nourish: the fictional fallback, used when the showcase is off
// ---------------------------------------------------------------------------

const NORTH_AND_NOURISH: DemoStore = {
  brand: {
    name: "North & Nourish",
    tagline: "Artisan roasters & providore",
    live: false,
  },
  theme: {
    ink: "#1E3A2F",
    inkHover: "#13271F",
    surface: "#FAF9F5",
    line: "#EAE5D9",
    accent: "#C87D4B",
  },
  products: [
    {
      id: "coorg-arabica",
      name: "Single-Origin Coorg Arabica",
      tagline: "High-altitude estate grown reserve coffee",
      categoryLabel: "Specialty coffee",
      description:
        "Grown in shade-canopied plantations in the Western Ghats, hand-picked, washed with spring water and roasted in small batches for stone-fruit notes and a dark cocoa body.",
      highlights: ["Wild honey", "Dark chocolate", "Sun-dried citrus"],
      provenance: "Coorg, Karnataka (1,350 m)",
      packSizes: [
        { id: "250g", label: "250g valve pouch", price: 680, compareAtPrice: 750, sku: "NN-COF-250", weightGrams: 300 },
        { id: "500g", label: "500g fresh pack", price: 1250, compareAtPrice: 1400, sku: "NN-COF-500", weightGrams: 560 },
        { id: "1kg", label: "1kg pantry bag", price: 2350, compareAtPrice: 2700, sku: "NN-COF-1KG", weightGrams: 1080 },
      ],
      art: "coffee",
      rating: { value: 4.9, count: 142 },
    },
    {
      id: "kerala-cardamom",
      name: "Wild Kerala Cardamom Pods",
      tagline: "Grade A extra bold 8mm+ green pods",
      categoryLabel: "Wild spices",
      description:
        "Hand-harvested from heirloom cardamom in the rainforest mist of Idukki, sorted for size and slow-cured to keep the aromatic oils.",
      highlights: ["Crushed pine", "Sweet eucalyptus", "Warm citrus"],
      provenance: "Idukki, Kerala (950 m)",
      packSizes: [
        { id: "100g", label: "100g glass jar", price: 440, compareAtPrice: 490, sku: "NN-CRD-100", weightGrams: 260 },
        { id: "250g", label: "250g sealed pouch", price: 980, compareAtPrice: 1150, sku: "NN-CRD-250", weightGrams: 290 },
      ],
      art: "spices",
      rating: { value: 4.95, count: 98 },
    },
    {
      id: "malabar-cocoa",
      name: "Single-Estate Malabar Cocoa",
      tagline: "Pure Dutch-processed cocoa",
      categoryLabel: "Artisan cocoa",
      description:
        "Fermented in teak sweatboxes, sun-dried on bamboo mats and gently Dutch-processed for a deep mahogany colour and low acidity.",
      highlights: ["Roasted nib", "Brown sugar", "Fudge"],
      provenance: "Malabar foothills, Kerala",
      packSizes: [
        { id: "200g", label: "200g embossed tin", price: 520, compareAtPrice: 580, sku: "NN-COC-200", weightGrams: 320 },
        { id: "500g", label: "500g baker's pouch", price: 1150, compareAtPrice: 1300, sku: "NN-COC-500", weightGrams: 560 },
      ],
      art: "cocoa",
      rating: { value: 4.88, count: 76 },
    },
  ],
  orders: [
    {
      id: "NN-9281",
      time: "2 minutes ago",
      customer: "Devika Narayanan",
      location: "Koramangala, Bengaluru",
      items: "Coorg Arabica 250g × 2, Kerala Cardamom 100g × 1",
      total: 1800,
      paymentMethod: "Razorpay UPI",
      paymentStatus: "PAID",
      fulfillmentStatus: "CONFIRMED",
      courier: "Delhivery Surface",
      awb: "",
    },
    {
      id: "NN-9280",
      time: "14 minutes ago",
      customer: "Arjun Singhania",
      location: "Bandra West, Mumbai",
      items: "Malabar Cocoa 500g × 1",
      total: 1150,
      paymentMethod: "Razorpay Card",
      paymentStatus: "PAID",
      fulfillmentStatus: "PACKED",
      courier: "Delhivery Express",
      awb: "DL9482103981",
    },
    {
      id: "NN-9279",
      time: "48 minutes ago",
      customer: "Rohan Varma",
      location: "Indiranagar, Bengaluru",
      items: "Malabar Cocoa 200g × 2",
      total: 1040,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "PENDING_COD",
      fulfillmentStatus: "CONFIRMED",
      courier: "Delhivery Surface",
      awb: "",
    },
    {
      id: "NN-B2B-08",
      time: "1 hour ago",
      customer: "Artisan Café (trade buyer)",
      location: "Koregaon Park, Pune",
      items: "Coorg Arabica, 25 kg wholesale",
      total: 41250,
      paymentMethod: "Bank transfer (50% advance)",
      paymentStatus: "PARTIAL_PAID",
      fulfillmentStatus: "DISPATCHED",
      courier: "Delhivery B2B Freight",
      awb: "DL-B2B-849201",
    },
  ],
  gstPercent: 5,
  orderPrefix: "NN",
  wholesale: {
    product: "Coorg Arabica Coffee",
    tiers: [
      { minKg: 10, ratePerKg: 1850 },
      { minKg: 25, ratePerKg: 1650 },
      { minKg: 50, ratePerKg: 1450 },
    ],
    retailPerKg: 2350,
  },
  tradeBuyer: { name: "Artisan Café & Bakery", city: "Pune, MH", gstin: "27ABCDE1234F1Z5" },
  warehouses: ["Bengaluru warehouse", "Mumbai warehouse"],
  basket: [
    { productId: "coorg-arabica", packId: "250g", qty: 2 },
    { productId: "kerala-cardamom", packId: "100g", qty: 1 },
  ],
  packNoun: "pack",
};

export const DEMO_STORE: DemoStore = site.showcase.enabled ? DARIYO : NORTH_AND_NOURISH;

/** CSS variables the storefront mock-ups use for the brand's colours. */
export function demoThemeStyle(): CSSProperties {
  const { theme } = DEMO_STORE;
  return {
    "--demo-ink": theme.ink,
    "--demo-ink-hover": theme.inkHover,
    "--demo-surface": theme.surface,
    "--demo-line": theme.line,
    "--demo-accent": theme.accent,
  } as CSSProperties;
}

export function findDemoProduct(id: string): DemoProduct {
  const product = DEMO_STORE.products.find((p) => p.id === id) ?? DEMO_STORE.products[0];
  if (!product) throw new Error("The demo store needs at least one product");
  return product;
}
