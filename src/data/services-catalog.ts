/**
 * Services and Developer Staffing Catalog.
 *
 * Defines the service offerings, technology specializations, project packages,
 * and developer staffing models available separately from the turnkey Dariyo clone.
 */

export interface TechnologySpecialization {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Mobile" | "Full-Stack";
  tagline: string;
  description: string;
  keyFeatures: string[];
  bestFor: string;
  badge: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  iconName: "Globe" | "Smartphone" | "Users" | "Cpu" | "Server";
  technologies: string[];
  deliverables: string[];
}

export interface ProjectPackage {
  id: string;
  name: string;
  category: "web" | "mobile" | "enterprise";
  tier: "Starter" | "Professional" | "Enterprise";
  summary: string;
  typicalTimeline: string;
  features: string[];
  indicativeFee: number;
  highlighted?: boolean;
}

export interface StaffingRole {
  id: string;
  title: string;
  stack: string;
  experienceLevel: "Mid-Level" | "Senior" | "Lead / Architect";
  description: string;
  skills: string[];
  hourlyRate: number;
  monthlyFullTimeRate: number; // 160 hrs/mo
  monthlyPartTimeRate: number; // 80 hrs/mo
}

export interface EngagementModel {
  id: string;
  title: string;
  badge: string;
  commitment: string;
  summary: string;
  inclusions: string[];
  highlighted?: boolean;
}

/**
 * Core technologies we provide engineering and dedicated developers for.
 */
export const TECHNOLOGIES: TechnologySpecialization[] = [
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    tagline: "High-Throughput APIs & Microservices",
    description:
      "Enterprise TypeScript & Express 5 backend architectures, event-driven microservices, third-party payment/carrier webhooks, and real-time Socket.IO servers.",
    keyFeatures: [
      "Type-safe TypeScript RESTful & GraphQL APIs",
      "Redis caching & distributed token-bucket rate limits",
      "Cryptographically verified HMAC webhooks",
      "MongoDB & PostgreSQL connection pooling",
    ],
    bestFor: "Scalable backend APIs, custom webhooks, real-time dashboards, and microservice architectures.",
    badge: "Backend & APIs",
  },
  {
    id: "react",
    name: "React.js",
    category: "Frontend",
    tagline: "Modern Dynamic Web Applications",
    description:
      "State-of-the-art React 19 web applications with reusable component architectures, accessible design systems, and rapid responsive interfaces.",
    keyFeatures: [
      "React 19 hooks, transitions, and concurrent rendering",
      "Tailwind CSS v4 design systems with responsive layouts",
      "TanStack Query & Table for fast client-side data management",
      "WCAG 2.1 accessibility compliance and fluid animations",
    ],
    bestFor: "SaaS dashboards, customer portals, interactive calculators, and high-conversion web apps.",
    badge: "Frontend UI/UX",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend",
    tagline: "Blazing Fast Python Microservices & AI",
    description:
      "Ultra-high performance asynchronous Python microservices for compute-heavy workloads, data processing pipelines, AI/ML workflows, and automated tasks.",
    keyFeatures: [
      "Asynchronous non-blocking architecture using Starlette and Pydantic",
      "Automatic OpenAPI & Swagger interactive documentation",
      "AI/LLM pipelines, embedding generation, and vector search integration",
      "Background worker queues with Celery or Redis Streams",
    ],
    bestFor: "Compute-intensive tasks, algorithmic processing, data ingestion, AI integrations, and high-concurrency microservices.",
    badge: "Python Microservices",
  },
  {
    id: "react-native",
    name: "React Native",
    category: "Mobile",
    tagline: "Cross-Platform iOS & Android Apps",
    description:
      "Production-ready mobile applications built with React Native and Expo SDK, delivering native 60fps performance on both Apple iOS and Google Android from a single codebase.",
    keyFeatures: [
      "Unified codebase for Apple App Store and Google Play Store",
      "Native push notifications (APNs & FCM)",
      "Biometric security (Face ID & Fingerprint auth)",
      "Offline SQLite/AsyncStorage catalog persistence and sync",
    ],
    bestFor: "Consumer apps, field staff tools, warehouse barcode scanners, and mobile shopping experiences.",
    badge: "Mobile Apps (iOS & Android)",
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "Full-Stack",
    tagline: "Production App Router & Server Components",
    description:
      "Industry-standard Next.js 16 framework combining React Server Components (RSC), Edge middleware, instant streaming, and top-tier Google Lighthouse SEO scores.",
    keyFeatures: [
      "App Router with Server Components and static site generation",
      "Edge routing, caching, and server actions",
      "95+ Lighthouse performance and Core Web Vitals optimization",
      "SEO metadata automation with OpenGraph cards and sitemaps",
    ],
    bestFor: "High-traffic e-commerce storefronts, public company websites, content platforms, and client portals.",
    badge: "Full-Stack & SSR",
  },
];

/**
 * Four primary service lines.
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "website-building",
    title: "Website & Web Application Building",
    eyebrow: "Modern Web Engineering",
    summary:
      "From bespoke corporate websites to complex SaaS applications. We design, engineer, and deploy high-speed web apps tailored to your business operations.",
    iconName: "Globe",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
    deliverables: [
      "Pixel-perfect responsive design across desktop, tablet, and mobile",
      "Fast server-side rendering for top search engine visibility",
      "Interactive forms, quote builders, and user accounts",
      "Automated deployment on Vercel, AWS, or your private cloud",
    ],
  },
  {
    id: "mobile-app-building",
    title: "Mobile App Development (iOS & Android)",
    eyebrow: "Native Mobile Engineering",
    summary:
      "Cross-platform mobile applications for Apple App Store and Google Play Store built with React Native. Native performance, unified code, and rapid delivery.",
    iconName: "Smartphone",
    technologies: ["React Native", "Expo SDK", "iOS", "Android", "Firebase"],
    deliverables: [
      "Single codebase published to Apple App Store & Google Play",
      "Native push notifications and deep linking",
      "Biometric login (FaceID / Fingerprint) & camera access",
      "Offline caching and background synchronization",
    ],
  },
  {
    id: "dedicated-developers",
    title: "Dedicated Developer Staffing",
    eyebrow: "Flexible Tech Augmentation",
    summary:
      "Hire seasoned senior developers in Node.js, React, FastAPI, React Native, or Next.js. Embedded full-time or part-time into your team's Slack, Jira, and GitHub.",
    iconName: "Users",
    technologies: ["Node.js", "React.js", "FastAPI", "React Native", "Next.js"],
    deliverables: [
      "100% dedicated senior engineers working in your timezone",
      "Daily standups, Jira/Linear task management, and GitHub pull requests",
      "Direct communication over Slack, Teams, or Google Meet",
      "Zero recruitment overhead, no lock-in, and flexible monthly scaling",
    ],
  },
  {
    id: "custom-development",
    title: "Custom Enterprise & API Solutions",
    eyebrow: "Bespoke Architecture",
    summary:
      "Custom microservices, third-party ERP/CRM integrations, data processing engines with Python FastAPI, and legacy monolith refactoring.",
    iconName: "Cpu",
    technologies: ["FastAPI", "Node.js", "MongoDB", "Redis", "Docker"],
    deliverables: [
      "High-throughput asynchronous microservices",
      "Custom payment gateways, carrier APIs, and webhook engines",
      "Containerized Docker deployments with automated CI/CD pipelines",
      "Complete technical documentation, Swagger schemas, and code audit",
    ],
  },
];

/**
 * Staffing roles available for hire.
 */
export const STAFFING_ROLES: StaffingRole[] = [
  {
    id: "nodejs-dev",
    title: "Node.js Backend Developer",
    stack: "Node.js · Express 5 · TypeScript · MongoDB · Redis",
    experienceLevel: "Senior",
    description:
      "Specializes in building secure, high-concurrency RESTful APIs, webhook verification engines, database schema design, and microservices.",
    skills: ["Express.js", "TypeScript", "Redis", "MongoDB", "Socket.IO", "HMAC Webhooks", "Docker"],
    hourlyRate: 1500,
    monthlyFullTimeRate: 180000,
    monthlyPartTimeRate: 98000,
  },
  {
    id: "react-nextjs-dev",
    title: "React & Next.js Developer",
    stack: "Next.js 16 · React 19 · TypeScript · Tailwind CSS v4",
    experienceLevel: "Senior",
    description:
      "Builds lightning-fast user interfaces, complex dashboards, responsive design systems, and SEO-optimized App Router architectures.",
    skills: ["Next.js App Router", "React 19", "Tailwind CSS v4", "TanStack Query", "Zod", "Framer Motion"],
    hourlyRate: 1500,
    monthlyFullTimeRate: 180000,
    monthlyPartTimeRate: 98000,
  },
  {
    id: "fastapi-dev",
    title: "FastAPI / Python Engineer",
    stack: "FastAPI · Python 3.12 · AsyncIO · Redis · Pydantic",
    experienceLevel: "Senior",
    description:
      "Specializes in asynchronous microservices, data processing pipelines, AI model integration, background worker queues, and high-speed APIs.",
    skills: ["FastAPI", "Pydantic", "AsyncIO", "Celery", "Pandas", "PostgreSQL", "Docker"],
    hourlyRate: 1600,
    monthlyFullTimeRate: 195000,
    monthlyPartTimeRate: 105000,
  },
  {
    id: "react-native-dev",
    title: "React Native Mobile Developer",
    stack: "React Native · Expo SDK · iOS · Android · TypeScript",
    experienceLevel: "Senior",
    description:
      "Builds cross-platform native iOS & Android applications, manages store submissions, implements push notifications, and handles offline storage.",
    skills: ["React Native", "Expo", "iOS Native Bridges", "Android SDK", "Push Notifications", "Biometrics"],
    hourlyRate: 1600,
    monthlyFullTimeRate: 195000,
    monthlyPartTimeRate: 105000,
  },
  {
    id: "fullstack-engineer",
    title: "Full-Stack TypeScript Engineer",
    stack: "Next.js · Node.js · React · TypeScript · Cloud",
    experienceLevel: "Lead / Architect",
    description:
      "End-to-end engineer capable of architecting databases, building backend services, crafting frontend UI, and configuring Docker cloud deployments.",
    skills: ["Full-Stack Architecture", "Next.js", "Node.js", "Database Modeling", "Docker", "AWS / Cloudflare"],
    hourlyRate: 1800,
    monthlyFullTimeRate: 220000,
    monthlyPartTimeRate: 120000,
  },
];

/**
 * Developer engagement models.
 */
export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "part-time",
    title: "Part-Time Retainer",
    badge: "Flexible Maintenance",
    commitment: "80 Hours / Month (approx. 20 hrs/week)",
    summary:
      "Ideal for existing products needing continuous feature development, bug fixes, performance tuning, and on-demand engineering support.",
    inclusions: [
      "Dedicated senior developer",
      "Direct Slack / Teams access",
      "Weekly planning & review sprint",
      "Code reviews and pull request management",
      "Unused hours roll over for 30 days",
    ],
  },
  {
    id: "full-time",
    title: "Full-Time Dedicated Developer",
    badge: "Most Popular",
    commitment: "160 Hours / Month (approx. 40 hrs/week)",
    summary:
      "A senior software engineer completely dedicated to your team. Operates as an embedded member of your company with daily standups.",
    inclusions: [
      "100% dedicated to your company",
      "Aligned with your team's timezone",
      "Daily standups and real-time collaboration",
      "Immediate onboarding within 3 to 5 business days",
      "Zero recruitment, benefits, or hardware overhead",
    ],
    highlighted: true,
  },
  {
    id: "squad",
    title: "Dedicated Engineering Pod",
    badge: "End-to-End Ownership",
    commitment: "Full Cross-Functional Team (3-4 members)",
    summary:
      "A complete turnkey engineering squad capable of taking product requirements from design to production rollout with zero internal management burden.",
    inclusions: [
      "1 Technical Lead / Architect",
      "2 Full-Stack / Mobile Engineers",
      "1 Dedicated QA & Automation Engineer",
      "Sprint planning, milestones, and SLA guarantees",
      "Bi-weekly executive progress demos",
    ],
  },
];

/**
 * Fixed-scope project packages for turnkey website & mobile building.
 */
export const PROJECT_PACKAGES: ProjectPackage[] = [
  {
    id: "starter-web-mvp",
    name: "Starter Web MVP",
    category: "web",
    tier: "Starter",
    summary: "Fast-track company website or high-converting product showcase built with Next.js 16.",
    typicalTimeline: "2 to 3 Weeks",
    indicativeFee: 75000,
    features: [
      "Modern Next.js 16 App Router architecture",
      "Custom responsive design with Tailwind CSS v4",
      "Up to 5 core pages with interactive contact forms",
      "Google Lighthouse 95+ SEO & performance audit",
      "Deployment setup on Vercel or your cloud host",
    ],
  },
  {
    id: "custom-web-portal",
    name: "Custom Web Application",
    category: "web",
    tier: "Professional",
    summary: "Full-stack web platform with user authentication, database, dashboard, and API integrations.",
    typicalTimeline: "4 to 6 Weeks",
    indicativeFee: 175000,
    highlighted: true,
    features: [
      "Next.js 16 + Node.js or FastAPI backend",
      "Customer authentication (Google, Phone OTP, Email)",
      "Role-based admin console & management dashboard",
      "MongoDB or PostgreSQL database modeling",
      "Payment gateway & webhook integration (Razorpay / Stripe)",
      "30 days of post-launch warranty and bug fixes",
    ],
  },
  {
    id: "mobile-app-standard",
    name: "Mobile App (iOS & Android)",
    category: "mobile",
    tier: "Professional",
    summary: "Native cross-platform mobile application with push alerts, authentication, and store publishing.",
    typicalTimeline: "5 to 7 Weeks",
    indicativeFee: 225000,
    features: [
      "React Native & Expo cross-platform codebase",
      "Apple App Store & Google Play Store release submissions",
      "Native push notifications (APNs / Firebase Cloud Messaging)",
      "Biometric authentication (Face ID / Fingerprint)",
      "Offline local data caching & state synchronization",
      "Full source code ownership in your private repository",
    ],
  },
  {
    id: "enterprise-omnichannel",
    name: "Omnichannel Web + Mobile Suite",
    category: "enterprise",
    tier: "Enterprise",
    summary: "Synchronized Next.js web portal + React Native iOS & Android apps sharing one central backend.",
    typicalTimeline: "8 to 12 Weeks",
    indicativeFee: 395000,
    features: [
      "Unified Next.js web portal + iOS app + Android app",
      "Node.js / FastAPI backend with real-time WebSocket sync",
      "Custom role permissions, inventory authority, and reporting",
      "Dockerized deployment with automated GitHub Actions CI/CD",
      "Cloudflare DDoS protection, Redis caching & automated backups",
      "60 days of priority engineering support & SLA",
    ],
  },
];

