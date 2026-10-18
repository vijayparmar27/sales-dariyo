/**
 * Demonstration Catalog & Storefront Data: NORTH & NOURISH
 *
 * Fictional luxury specialty food & providore brand used exclusively for the
 * platform sales website product demonstration, as specified in the creative brief.
 *
 * Keeps demo data separate, realistic, and completely isolated from the real Dariyo business.
 */

export interface DemoPackSize {
  id: string;
  label: string;
  weightGrams: number;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
  popular?: boolean;
}

export interface DemoProduct {
  id: string;
  name: string;
  tagline: string;
  category: "coffee" | "spices" | "cocoa" | "gift-boxes";
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  origin: string;
  altitude?: string;
  tastingNotes: string[];
  description: string;
  packSizes: DemoPackSize[];
  wholesaleTiers: {
    minQty: number;
    unit: string;
    ratePerUnit: number;
    savingPercent: number;
  }[];
  inventory: {
    warehouse: string;
    stock: number;
    status: "in-stock" | "low-stock";
  }[];
}

export const DEMO_BRAND = {
  name: "NORTH & NOURISH",
  tagline: "Artisan Roasters & Providore",
  founded: "Est. 2024 · High-Altitude Coorg & Malabar",
  palette: {
    bg: "#FDFBF7",
    cardBg: "#FFFFFF",
    primary: "#1E3A2F", // Forest Green
    secondary: "#1A1412", // Espresso Brown
    accent: "#C87D4B", // Warm Copper
    accentLight: "#E29D62",
    muted: "#6B7280",
    border: "#EAE5D9",
  },
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: "coorg-arabica",
    name: "Single-Origin Coorg Arabica",
    tagline: "High-Altitude Estate Grown Reserve Coffee",
    category: "coffee",
    categoryLabel: "Specialty Coffee",
    rating: 4.9,
    reviewCount: 142,
    origin: "Coorg, Karnataka (1,350m Elevation)",
    altitude: "1,350m",
    tastingNotes: ["Wild Honey", "Dark Chocolate", "Sun-Dried Citrus"],
    description:
      "Grown in shade-canopied high-altitude plantations in the Western Ghats. Hand-picked ripe red cherries, washed with spring water, and roasted in small 12kg micro-batches to bring out lush stone fruit notes and a velvety dark cocoa body.",
    packSizes: [
      {
        id: "250g",
        label: "250g Valve Pouch",
        weightGrams: 250,
        price: 680,
        compareAtPrice: 750,
        stock: 84,
        sku: "NN-COF-250",
        popular: true,
      },
      {
        id: "500g",
        label: "500g Fresh Pack",
        weightGrams: 500,
        price: 1250,
        compareAtPrice: 1400,
        stock: 52,
        sku: "NN-COF-500",
      },
      {
        id: "1kg",
        label: "1kg Pantry Bag",
        weightGrams: 1000,
        price: 2350,
        compareAtPrice: 2700,
        stock: 28,
        sku: "NN-COF-1KG",
      },
    ],
    wholesaleTiers: [
      { minQty: 10, unit: "kg", ratePerUnit: 1850, savingPercent: 21 },
      { minQty: 25, unit: "kg", ratePerUnit: 1650, savingPercent: 30 },
      { minQty: 50, unit: "kg", ratePerUnit: 1450, savingPercent: 38 },
    ],
    inventory: [
      { warehouse: "Bangalore Central Hub", stock: 114, status: "in-stock" },
      { warehouse: "Mumbai Port Fulfillment", stock: 50, status: "in-stock" },
    ],
  },
  {
    id: "kerala-cardamom",
    name: "Wild Kerala Cardamom Pods",
    tagline: "Grade A Extra Bold 8mm+ Green Pods",
    category: "spices",
    categoryLabel: "Wild Spices",
    rating: 4.95,
    reviewCount: 98,
    origin: "Idukki Valley, Kerala (950m Elevation)",
    tastingNotes: ["Crushed Pine", "Sweet Eucalyptus", "Warm Citrus"],
    description:
      "Hand-harvested from wild heirloom cardamom plants in the rainforest mist of Idukki. Hand-sorted for size (8mm+ diameter) and slow-cured in traditional wood-fired drying chambers to retain rich essential aromatic oils.",
    packSizes: [
      {
        id: "100g",
        label: "100g Glass Jar",
        weightGrams: 100,
        price: 440,
        compareAtPrice: 490,
        stock: 62,
        sku: "NN-CRD-100",
        popular: true,
      },
      {
        id: "250g",
        label: "250g Sealed Pouch",
        weightGrams: 250,
        price: 980,
        compareAtPrice: 1150,
        stock: 18, // Triggers low-stock in admin!
        sku: "NN-CRD-250",
      },
      {
        id: "500g",
        label: "500g Culinary Pack",
        weightGrams: 500,
        price: 1850,
        compareAtPrice: 2100,
        stock: 31,
        sku: "NN-CRD-500",
      },
    ],
    wholesaleTiers: [
      { minQty: 5, unit: "kg", ratePerUnit: 3200, savingPercent: 18 },
      { minQty: 15, unit: "kg", ratePerUnit: 2900, savingPercent: 25 },
      { minQty: 30, unit: "kg", ratePerUnit: 2600, savingPercent: 33 },
    ],
    inventory: [
      { warehouse: "Bangalore Central Hub", stock: 18, status: "low-stock" },
      { warehouse: "Mumbai Port Fulfillment", stock: 93, status: "in-stock" },
    ],
  },
  {
    id: "malabar-cocoa",
    name: "Single-Estate Malabar Cocoa",
    tagline: "100% Pure Dutch-Processed Alkalized Cocoa",
    category: "cocoa",
    categoryLabel: "Artisan Cocoa",
    rating: 4.88,
    reviewCount: 76,
    origin: "Malabar Foothills, Kerala",
    tastingNotes: ["Roasted Nib", "Brown Sugar", "Fudge Truffle"],
    description:
      "Fermented in native teak wood sweatboxes for 6 days and sun-dried on bamboo mats. Gently Dutch-processed to reduce acidity, yielding a deeply saturated dark mahogany hue and a luxurious 22–24% natural cocoa butter content.",
    packSizes: [
      {
        id: "200g",
        label: "200g Embossed Tin",
        weightGrams: 200,
        price: 520,
        compareAtPrice: 580,
        stock: 45,
        sku: "NN-COC-200",
        popular: true,
      },
      {
        id: "500g",
        label: "500g Baker's Pouch",
        weightGrams: 500,
        price: 1150,
        compareAtPrice: 1300,
        stock: 38,
        sku: "NN-COC-500",
      },
    ],
    wholesaleTiers: [
      { minQty: 10, unit: "kg", ratePerUnit: 1750, savingPercent: 24 },
      { minQty: 25, unit: "kg", ratePerUnit: 1500, savingPercent: 35 },
    ],
    inventory: [
      { warehouse: "Bangalore Central Hub", stock: 52, status: "in-stock" },
      { warehouse: "Mumbai Port Fulfillment", stock: 31, status: "in-stock" },
    ],
  },
  {
    id: "reserve-box",
    name: "The Reserve Providore Sampler",
    tagline: "Artisan Wooden Gift Casket with Satin Pull",
    category: "gift-boxes",
    categoryLabel: "Curated Samplers",
    rating: 5.0,
    reviewCount: 64,
    origin: "South India Provenance Trio",
    tastingNotes: ["Coorg Coffee (250g)", "Kerala Cardamom (100g)", "Malabar Cocoa (200g)"],
    description:
      "A hand-crafted keepsake wooden box featuring North & Nourish's three signature harvest staples. Includes tasting notes booklet, brass measuring scoop, and estate harvest certificates.",
    packSizes: [
      {
        id: "box",
        label: "Limited Casket Edition",
        weightGrams: 1150,
        price: 2450,
        compareAtPrice: 2800,
        stock: 24,
        sku: "NN-GFT-01",
        popular: true,
      },
    ],
    wholesaleTiers: [
      { minQty: 20, unit: "boxes", ratePerUnit: 1850, savingPercent: 24 },
      { minQty: 50, unit: "boxes", ratePerUnit: 1600, savingPercent: 35 },
    ],
    inventory: [
      { warehouse: "Bangalore Central Hub", stock: 24, status: "in-stock" },
      { warehouse: "Mumbai Port Fulfillment", stock: 0, status: "low-stock" },
    ],
  },
];

export const DEMO_RECENT_ORDERS = [
  {
    id: "ORD-9281",
    time: "2 minutes ago",
    customer: "Devika Narayanan",
    location: "Koramangala, Bangalore",
    items: "Coorg Arabica 250g × 2, Kerala Cardamom 100g × 1",
    total: 1800,
    paymentMethod: "Razorpay UPI",
    paymentStatus: "PAID",
    fulfillmentStatus: "CONFIRMED",
    courier: "Delhivery Surface",
    awb: "DL9482103982",
  },
  {
    id: "ORD-9280",
    time: "14 minutes ago",
    customer: "Arjun Singhania",
    location: "Bandra West, Mumbai",
    items: "The Reserve Providore Sampler × 1",
    total: 2450,
    paymentMethod: "Razorpay Card",
    paymentStatus: "PAID",
    fulfillmentStatus: "PACKED",
    courier: "Delhivery Express",
    awb: "DL9482103981",
  },
  {
    id: "ORD-9279",
    time: "48 minutes ago",
    customer: "Rohan Varma",
    location: "Indiranagar, Bangalore",
    items: "Malabar Cocoa 200g × 2",
    total: 1040,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "PENDING_COD",
    fulfillmentStatus: "CONFIRMED",
    courier: "Delhivery Surface",
    awb: "DL9482103980",
  },
  {
    id: "ORD-9278",
    time: "1 hour ago",
    customer: "Siddharth Rao (B2B Trade)",
    location: "Artisan Cafe & Bakery, Pune",
    items: "Coorg Arabica Beans 25kg Bulk Sack",
    total: 41250,
    paymentMethod: "Bank NEFT (50% Advance)",
    paymentStatus: "PARTIAL_PAID",
    fulfillmentStatus: "DISPATCHED",
    courier: "Delhivery B2B Freight",
    awb: "DL-B2B-849201",
  },
];

