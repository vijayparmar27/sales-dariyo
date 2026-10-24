export interface RoleLandingPageData {
  slug: string;
  roleId: string;
  badge: string;
  h1: string;
  h1Italic: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  skillsList: string[];
  keyOutcomes: string[];
  technicalFocus: {
    category: string;
    points: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const ROLE_LANDING_PAGES: Record<string, RoleLandingPageData> = {
  "hire-react-developers": {
    slug: "hire-react-developers",
    roleId: "react-nextjs-dev",
    badge: "Pre-Vetted Talent",
    h1: "Hire Dedicated React Developers",
    h1Italic: "for High-Velocity Web Engineering",
    subtitle:
      "Onboard senior React 19 engineers specializing in TypeScript, Tailwind CSS, TanStack Query, and accessible design systems. 1-week risk-free trial.",
    metaTitle: "Hire Dedicated React.js Developers | Pre-Vetted Senior Engineers",
    metaDescription:
      "Hire top 1% dedicated React.js developers in India. Senior engineers with React 19, TypeScript, and modern frontend architecture. Onboard in 48 hours with 1-week trial.",
    keywords: [
      "hire react developers",
      "dedicated react developers India",
      "hire react.js engineer",
      "react 19 developers for hire",
      "frontend developer staffing",
      "remote react programmers",
    ],
    skillsList: [
      "React 19 & Concurrent Features",
      "TypeScript (Strict Type-Safety)",
      "Tailwind CSS v4 & Shadcn UI",
      "TanStack Query (Async State)",
      "Framer Motion & Micro-Interactions",
      "Next.js App Router Integration",
      "WCAG 2.1 Accessibility (a11y)",
      "Jest, Vitest & Playwright Testing",
    ],
    keyOutcomes: [
      "Sub-second interactive client experiences with 60fps animations",
      "Zero-technical-debt component libraries documented with Storybook",
      "Seamless integration into your Jira, Slack, and GitHub workflows",
      "Full IP ownership committed directly to your private Git repositories",
    ],
    technicalFocus: [
      {
        category: "Frontend UI Architecture",
        points: [
          "Scalable compound component design patterns",
          "Optimistic UI updates and resilient offline caching",
          "Advanced bundle splitting and dynamic lazy loading",
        ],
      },
      {
        category: "Team Integration & Delivery",
        points: [
          "Direct communication with daily standups in your timezone",
          "Peer-reviewed Pull Requests with automated CI/CD checks",
          "Flexible monthly scaling with 14-day notice",
        ],
      },
    ],
    faqs: [
      {
        question: "How quickly can a dedicated React developer start?",
        answer:
          "Pre-vetted React developers can join your Slack and repository within 24 to 48 hours after our introductory alignment call.",
      },
      {
        question: "Do you offer a risk-free trial period?",
        answer:
          "Yes. Every placement begins with a 1-week risk-free trial. If the developer's velocity does not meet your standards, you pay nothing.",
      },
      {
        question: "Who owns the code and intellectual property (IP)?",
        answer:
          "You own 100% of all intellectual property, source code, and design assets from day one under a strict Mutual NDA.",
      },
      {
        question: "What time zones do your React engineers accommodate?",
        answer:
          "We provide guaranteed 4 to 5 hours of synchronous daily overlap across North America (EST/PST), Europe (GMT/CET), and Asia-Pacific (IST/SGT).",
      },
    ],
  },
  "hire-nextjs-developers": {
    slug: "hire-nextjs-developers",
    roleId: "react-nextjs-dev",
    badge: "Next.js 16 Specialists",
    h1: "Hire Dedicated Next.js Developers",
    h1Italic: "for Sub-Second Server-Side Experiences",
    subtitle:
      "Senior Next.js 16 engineers expert in React Server Components (RSC), App Router, Edge Middleware, and Core Web Vitals optimization.",
    metaTitle: "Hire Dedicated Next.js Developers | Next.js 16 App Router Specialists",
    metaDescription:
      "Hire dedicated Next.js developers for production App Router, Server Components, SSR, and eCommerce platforms. Top-tier 95+ Lighthouse scores guaranteed.",
    keywords: [
      "hire nextjs developers",
      "dedicated next.js engineers",
      "next.js 16 specialists India",
      "hire react server component developers",
      "nextjs ecommerce development",
      "full stack nextjs staffing",
    ],
    skillsList: [
      "Next.js 16 App Router & RSC",
      "Edge Middleware & Edge Functions",
      "Incremental Static Regeneration (ISR)",
      "Server Actions & Form Mutations",
      "Core Web Vitals & 95+ Lighthouse",
      "Headless CMS & GraphQL Integration",
      "Docker Multi-Stage Deployments",
      "OpenGraph Card Automation",
    ],
    keyOutcomes: [
      "Sub-200ms TTFB across global CDNs with fine-tuned edge caching",
      "Flawless 95+ Core Web Vitals scores boosting organic Google rankings",
      "Zero layout shifts and instantaneous client navigation transitions",
      "Production deployment pipelines on Vercel, AWS ECS, or private Docker",
    ],
    technicalFocus: [
      {
        category: "Rendering & Cache Strategies",
        points: [
          "Granular tag-based revalidation (revalidateTag) for instant cache purging",
          "Streaming SSR with Suspense boundaries for progressive rendering",
          "Hybrid static-dynamic page architectures",
        ],
      },
      {
        category: "Security & Production Readiness",
        points: [
          "Strict Content Security Policy (CSP) and security headers",
          "Bot mitigation with Edge Middleware pattern matching",
          "Automated Lighthouse CI checks on every Pull Request",
        ],
      },
    ],
    faqs: [
      {
        question: "Can your Next.js developers optimize our existing slow Next.js app?",
        answer:
          "Yes. Our engineers frequently conduct Core Web Vitals audits, migrate legacy Pages Router apps to App Router, and reduce bundle sizes by up to 60%.",
      },
      {
        question: "Do your Next.js developers build full-stack or frontend only?",
        answer:
          "Both. Our Next.js engineers handle full-stack implementations including Server Actions, database queries (PostgreSQL/MongoDB), caching (Redis), and third-party APIs.",
      },
      {
        question: "What is your developer onboarding process?",
        answer:
          "We introduce pre-vetted engineers with relevant portfolio repos, conduct a 30-minute technical interview with your team, sign the NDA, and start within 48 hours.",
      },
    ],
  },
  "hire-nodejs-developers": {
    slug: "hire-nodejs-developers",
    roleId: "nodejs-dev",
    badge: "Backend & Microservices",
    h1: "Hire Dedicated Node.js Developers",
    h1Italic: "for High-Throughput Cloud APIs",
    subtitle:
      "Enterprise TypeScript & Express/Fastify engineers. Build resilient microservices, HMAC payment webhooks, database pooling, and real-time Socket.IO systems.",
    metaTitle: "Hire Dedicated Node.js Developers | High-Throughput Backend Engineers",
    metaDescription:
      "Hire senior Node.js backend developers in India. Experts in TypeScript, Express 5, Fastify, PostgreSQL, MongoDB, Redis, and event-driven microservices.",
    keywords: [
      "hire nodejs developers",
      "dedicated node.js backend engineer",
      "hire typescript backend developer",
      "express fastify developers India",
      "microservices backend staffing",
      "hire api developers",
    ],
    skillsList: [
      "TypeScript & Express 5 / Fastify",
      "PostgreSQL & MongoDB Pooling",
      "Redis Caching & Token-Bucket Rate Limiting",
      "HMAC Webhook Cryptographic Verification",
      "Socket.IO & Real-Time Event Streams",
      "Docker & Kubernetes Containerization",
      "RESTful API & GraphQL Architecture",
      "Unit & Integration Testing (Jest/Supertest)",
    ],
    keyOutcomes: [
      "Ultra-low latency APIs capable of processing 10,000+ requests per second",
      "Zero-downtime database migrations with automated schema validation",
      "Cryptographically hardened webhook endpoints for payment and logistics",
      "Comprehensive OpenAPI/Swagger documentation for team transparency",
    ],
    technicalFocus: [
      {
        category: "Performance & Concurrency",
        points: [
          "Event loop non-blocking optimization and worker threads",
          "Distributed Redis Pub/Sub for horizontal scaling",
          "Database connection pooling and index optimization",
        ],
      },
      {
        category: "Enterprise Security",
        points: [
          "JWT rotation and secure HTTP-only cookie authentication",
          "OWASP Top 10 mitigation (injection, CSRF, rate limits)",
          "Audit logging and centralized structured logging (Pino)",
        ],
      },
    ],
    faqs: [
      {
        question: "What backend frameworks do your Node.js engineers use?",
        answer:
          "Our engineers specialize in Express 5, Fastify, NestJS, and native Node.js HTTP/2, all written in strict TypeScript.",
      },
      {
        question: "Can your developers handle database schema design and migrations?",
        answer:
          "Yes. We design high-performance PostgreSQL and MongoDB schemas, implement Prisma/Drizzle ORMs, and run automated migrations with zero downtime.",
      },
      {
        question: "How do your developers ensure API security?",
        answer:
          "Every API is hardened with rate limiting, input sanitization via Zod, HMAC signature verification for webhooks, and strict CORS policies.",
      },
    ],
  },
  "hire-fastapi-developers": {
    slug: "hire-fastapi-developers",
    roleId: "fastapi-dev",
    badge: "Python & AI Microservices",
    h1: "Hire Dedicated Python FastAPI Developers",
    h1Italic: "for High-Performance Data & AI Workloads",
    subtitle:
      "Asynchronous Python 3.12 engineers for compute-heavy workloads, AI model pipelines, vector search integration, and background Celery worker queues.",
    metaTitle: "Hire Dedicated Python FastAPI Developers | AI & Async Microservices",
    metaDescription:
      "Hire dedicated FastAPI and Python engineers. Specialists in asynchronous APIs, AI/LLM integrations, vector databases, Pydantic validation, and Celery workers.",
    keywords: [
      "hire fastapi developers",
      "dedicated python developer India",
      "hire async python engineers",
      "ai microservice developers",
      "fastapi backend staffing",
      "python api engineers for hire",
    ],
    skillsList: [
      "FastAPI & Starlette Async Architecture",
      "Python 3.12 & Type Hinting",
      "Pydantic v2 Data Validation",
      "AI/LLM Embedding & Vector Search",
      "Celery & Redis Background Task Queues",
      "SQLAlchemy 2.0 Async ORM",
      "Automated Swagger / OpenAPI Docs",
      "PyTest Asynchronous Test Suites",
    ],
    keyOutcomes: [
      "Asynchronous non-blocking APIs with execution speeds rivaling Go and Node.js",
      "Seamless integration of LLM pipelines, RAG systems, and embedding models",
      "Strict data contract validation with automatic documentation",
      "Scalable worker queues for asynchronous email, report, and video processing",
    ],
    technicalFocus: [
      {
        category: "Asynchronous Python Architecture",
        points: [
          "AsyncIO event loops for high-concurrency I/O operations",
          "Connection pooling with asyncpg and redis-py",
          "Graceful shutdown and health check endpoints",
        ],
      },
      {
        category: "AI & Data Ingestion",
        points: [
          "Integration with OpenAI, Anthropic, and local HuggingFace models",
          "Vector embeddings and similarity search (Qdrant, pgvector)",
          "Batch processing pipelines with memory-efficient generators",
        ],
      },
    ],
    faqs: [
      {
        question: "Why choose FastAPI over Django or Flask for our microservices?",
        answer:
          "FastAPI offers native async support, automated interactive documentation, and speeds up to 300% faster than traditional synchronous Flask or Django.",
      },
      {
        question: "Can your Python developers build AI-powered features?",
        answer:
          "Yes. We integrate generative AI models, build vector search retrieval systems, and construct automated classification workflows.",
      },
      {
        question: "What is your hourly or monthly pricing for senior Python engineers?",
        answer:
          "Senior FastAPI engineers start at ₹1,500/hr ($18/hr) or ₹1,80,000/mo ($2,160/mo) for full-time 160 hours/month engagement.",
      },
    ],
  },
  "hire-react-native-developers": {
    slug: "hire-react-native-developers",
    roleId: "react-native-dev",
    badge: "iOS & Android Apps",
    h1: "Hire Dedicated React Native Developers",
    h1Italic: "for 60fps Native Mobile Apps",
    subtitle:
      "Cross-platform mobile developers using React Native and Expo SDK. Single codebase published to Apple App Store and Google Play Store with native device features.",
    metaTitle: "Hire Dedicated React Native Developers | iOS & Android Mobile Apps",
    metaDescription:
      "Hire dedicated React Native and Expo mobile app developers. Build 60fps cross-platform apps for iOS and Android with offline sync, biometrics, and push notifications.",
    keywords: [
      "hire react native developers",
      "dedicated mobile app developer India",
      "expo mobile app developers",
      "cross platform ios android engineers",
      "react native app staffing",
      "hire mobile programmers",
    ],
    skillsList: [
      "React Native & Expo SDK",
      "Native iOS (Swift) & Android (Kotlin) Bridges",
      "Apple App Store & Google Play Publishing",
      "Push Notifications (APNs & Firebase FCM)",
      "Biometric Authentication (Face ID / Fingerprint)",
      "Offline SQLite & WatermelonDB Sync",
      "Camera, Barcode & Bluetooth Device Access",
      "React Navigation & Fluid Transitions",
    ],
    keyOutcomes: [
      "Cut mobile engineering costs by 50% with a single shared codebase",
      "Native 60fps animations with React Native Reanimated and Gesture Handler",
      "Reliable offline catalog storage with automated background sync",
      "End-to-end management of App Store review guidelines and approvals",
    ],
    technicalFocus: [
      {
        category: "Mobile Performance & UX",
        points: [
          "Hermes JavaScript engine tuning for instant cold starts",
          "Memory management and image caching with FastImage",
          "Deep linking and universal links for omni-channel acquisition",
        ],
      },
      {
        category: "Store Publishing & CI/CD",
        points: [
          "Automated EAS (Expo Application Services) build and submit pipelines",
          "Crashlytics and Sentry mobile error monitoring",
          "CodePush over-the-air (OTA) updates for urgent hotfixes",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a React Native app feel like a native iOS and Android app?",
        answer:
          "Yes. React Native compiles to actual native UI widgets (UIKit on iOS and Views on Android), giving users full 60fps native feel, gestures, and performance.",
      },
      {
        question: "Can your mobile developers handle the App Store and Google Play launch?",
        answer:
          "Yes. We handle code signing, app certificates, privacy compliance questionnaires, store screenshots, and submission through approval.",
      },
      {
        question: "Can our mobile app work without an internet connection?",
        answer:
          "Yes. We architect offline-first mobile apps using local SQLite or WatermelonDB, queuing cart actions and syncing whenever connectivity is restored.",
      },
    ],
  },
  "hire-fullstack-developers": {
    slug: "hire-fullstack-developers",
    roleId: "fullstack-lead",
    badge: "Full-Stack Leads & Architects",
    h1: "Hire Dedicated Full-Stack TypeScript Leads",
    h1Italic: "for End-to-End System Delivery",
    subtitle:
      "Senior architects proficient in Next.js 16, Node.js, PostgreSQL, Docker, and AWS cloud DevOps. Take features from concept to production deployment.",
    metaTitle: "Hire Full-Stack TypeScript Leads | Senior Web & Cloud Architects",
    metaDescription:
      "Hire senior full-stack TypeScript developers and architects in India. Experts in Next.js, Node.js, PostgreSQL, Docker, AWS, and complete end-to-end system delivery.",
    keywords: [
      "hire fullstack developers",
      "dedicated full-stack typescript engineer",
      "hire software architect India",
      "nextjs nodejs full stack developer",
      "senior tech lead staffing",
      "fractional cto developers",
    ],
    skillsList: [
      "Full-Stack TypeScript (End-to-End)",
      "Next.js 16 App Router & React 19",
      "Node.js & Fastify Backend APIs",
      "PostgreSQL, Redis & MongoDB Architecture",
      "Docker, Traefik & Cloud DevOps (AWS/Hetzner)",
      "Microservice & Monorepo Architecture (Turborepo)",
      "System Design & Database Index Tuning",
      "Team Mentorship & Architecture Reviews",
    ],
    keyOutcomes: [
      "Unified type-safety shared across frontend, backend, and mobile repositories",
      "Production-ready CI/CD automation deploying with zero downtime",
      "Scalable database architectures handling millions of records effortlessly",
      "Direct technical leadership accelerating your in-house team velocity",
    ],
    technicalFocus: [
      {
        category: "System Design & Scalability",
        points: [
          "Modular domain-driven architecture for rapid feature additions",
          "Automated backup, replication, and disaster recovery strategies",
          "End-to-end tracing and monitoring (Prometheus, Grafana, Sentry)",
        ],
      },
      {
        category: "Leadership & Code Quality",
        points: [
          "Strict ESLint, Prettier, and TypeScript compiler configurations",
          "Architectural documentation and ADRs (Architecture Decision Records)",
          "Mentorship and pairing with your junior and mid-level developers",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a Full-Stack Lead serve as a Fractional CTO for our startup?",
        answer:
          "Yes. Our senior architects frequently advise technical founders, choose technology stacks, design cloud architectures, and oversee code quality.",
      },
      {
        question: "How do your Full-Stack Leads coordinate with our team?",
        answer:
          "They join your daily standups, review PRs, maintain your Jira/Linear boards, and write comprehensive architecture documentation.",
      },
      {
        question: "What is the engagement model for full-stack architects?",
        answer:
          "Available full-time (160 hrs/mo at ₹2,20,000/mo) or part-time (80 hrs/mo at ₹1,20,000/mo) with standard 14-day scaling flexibility.",
      },
    ],
  },
  "hire-devops-engineers": {
    slug: "hire-devops-engineers",
    roleId: "devops-engineer",
    badge: "Cloud & Infrastructure",
    h1: "Hire Dedicated DevOps & Cloud Engineers",
    h1Italic: "for Zero-Downtime High-Scale Platforms",
    subtitle:
      "Onboard senior DevOps specialists to architect resilient AWS, Hetzner, or VPS cloud infrastructure, configure automated GitHub Actions CI/CD pipelines, and slash server hosting overhead.",
    metaTitle: "Hire Dedicated DevOps Engineers | AWS, Docker, Kubernetes Specialists | Dariyo",
    metaDescription:
      "Hire top dedicated DevOps and cloud infrastructure engineers in India. Experts in Docker Compose, Kubernetes, AWS, PostgreSQL clustering, and CI/CD. 1-week risk-free trial.",
    keywords: [
      "hire devops engineers",
      "dedicated devops engineers India",
      "hire cloud infrastructure engineer",
      "docker kubernetes consultant",
      "aws devops specialist for hire",
      "hire ci cd automation engineer",
    ],
    skillsList: [
      "Docker & Docker Compose Containerization",
      "Kubernetes (K8s) Cluster Orchestration",
      "AWS (ECS, RDS, S3, CloudFront, IAM)",
      "Hetzner Cloud & Bare Metal Optimization",
      "GitHub Actions & GitLab CI/CD Automation",
      "PostgreSQL Replication & Redis Sentinel",
      "Nginx, Caddy & Automated Let's Encrypt SSL",
      "Prometheus & Grafana Monitoring & Alerting",
    ],
    keyOutcomes: [
      "Zero-downtime rolling deployments for storefront and backend APIs",
      "Automated CI/CD pipelines catching linting, typing, and test errors on every PR",
      "Up to 60% cloud hosting cost reduction via rightsizing and caching",
      "Hardened infrastructure security compliant with OWASP and SOC-2 standards",
    ],
    technicalFocus: [
      {
        category: "Cloud Architecture & High Availability",
        points: [
          "Multi-AZ failover and automated database snapshot retention",
          "Edge caching and DDoS mitigation via Cloudflare Enterprise / Pro",
          "Automated horizontal pod autoscaling based on CPU and memory thresholds",
        ],
      },
      {
        category: "Security & Observability",
        points: [
          "Zero-trust VPC peering, IAM least-privilege policies, and secrets rotation",
          "Centralized structured log streaming via Loki or Datadog",
          "Real-time uptime health-checks with PagerDuty / Telegram incident alerts",
        ],
      },
    ],
    faqs: [
      {
        question: "Can your DevOps engineers audit and reduce our current cloud bills?",
        answer:
          "Yes. Our cloud audits typically reduce AWS/GCP bills by 30% to 60% by eliminating zombie resources, rightsizing RDS instances, implementing Graviton processors, and setting up intelligent S3 lifecycle tiering.",
      },
      {
        question: "How quickly can a dedicated DevOps engineer start on our project?",
        answer:
          "Pre-vetted DevOps specialists can join your Slack and GitHub organization within 24 to 48 hours with guaranteed daily timezone overlap.",
      },
      {
        question: "Do you support self-hosted servers like Hetzner, OVH, or DigitalOcean?",
        answer:
          "Yes. We specialize in both major clouds (AWS/GCP) and cost-effective bare metal/VPS providers (Hetzner, OVH, DigitalOcean), helping you achieve maximum throughput at a fraction of hyperscaler costs.",
      },
      {
        question: "What is your pricing model for dedicated DevOps engineers?",
        answer:
          "Available full-time (160 hrs/mo at ₹2,10,000/mo) or part-time (80 hrs/mo at ₹1,15,000/mo) with a 1-week risk-free trial.",
      },
    ],
  },
  "hire-threejs-developers": {
    slug: "hire-threejs-developers",
    roleId: "threejs-developer",
    badge: "Interactive 3D & WebGL",
    h1: "Hire Dedicated Three.js & 3D WebGL Developers",
    h1Italic: "for Immersive Interactive Web Experiences",
    subtitle:
      "Elevate buyer engagement with photorealistic 3D product visualizers, 360-degree configurators, and smooth 60fps WebGL canvas interactions built with Three.js and React Three Fiber.",
    metaTitle: "Hire Dedicated Three.js & WebGL Developers | 3D Interactive Specialists | Dariyo",
    metaDescription:
      "Hire top Three.js, WebGL, and React Three Fiber (R3F) developers in India. Build photorealistic 3D product viewers, customizers, and interactive canvases. 1-week trial.",
    keywords: [
      "hire threejs developers",
      "dedicated three.js developer India",
      "hire 3d webgl developer",
      "react three fiber developers for hire",
      "3d product visualizer development",
      "interactive webgl programmer",
    ],
    skillsList: [
      "Three.js & React Three Fiber (R3F)",
      "GLTF & GLB Model Compression (Draco / Meshopt)",
      "Custom GLSL Shader Programming (Vertex & Fragment)",
      "Interactive 3D Product Customizers & Materials",
      "Google Model Viewer & WebXR / AR Integration",
      "60fps WebGL Performance Tuning on Mobile",
      "Lighting, Shadow Maps, Post-Processing (Bloom / SSAO)",
      "TypeScript & Canvas State Reconciliation",
    ],
    keyOutcomes: [
      "Photorealistic 3D product viewports that increase eCommerce conversion rates by 40%+",
      "Ultra-compact 3D assets loading in under 500ms on 4G/5G mobile devices",
      "Smooth touch orbit, pan, and zoom controls optimized for iOS and Android web browsers",
      "Interactive dimension guides, exploded assembly views, and color variant switches",
    ],
    technicalFocus: [
      {
        category: "3D Asset Optimization & Loading Speed",
        points: [
          "Draco geometric compression reducing 50MB CAD files to sub-2MB GLB assets",
          "Progressive texture streaming with KTX2 / Basis Universal GPU textures",
          "Efficient draw-call batching and instanced rendering for complex scenes",
        ],
      },
      {
        category: "User Experience & Cross-Device Compatibility",
        points: [
          "Graceful WebGL context loss handling and automatic low-power fallbacks",
          "Native augmented reality (AR Quick Look on iOS and Scene Viewer on Android)",
          "Accessible UI controls with keyboard focus and screen reader descriptions",
        ],
      },
    ],
    faqs: [
      {
        question: "How do 3D product visualizers impact eCommerce conversion rates?",
        answer:
          "Studies across retail, fashion, and furniture show that interactive 3D product viewers and 360-degree configurators increase conversion rates by 25% to 40% and reduce returns by up to 35% because buyers inspect textures and dimensions accurately.",
      },
      {
        question: "Will heavy 3D models slow down our page speed scores?",
        answer:
          "No. Our Three.js engineers use Draco compression, Meshopt, and lazy canvas mounting, ensuring your Core Web Vitals remain in the 95+ range with fast First Contentful Paint.",
      },
      {
        question: "Can you convert our existing 2D product photos or CAD files into 3D models?",
        answer:
          "Yes. We can work with your existing OBJ, STEP, FBX, or CAD files, or model and texture your catalogue from reference photos into optimized web-ready GLB assets.",
      },
      {
        question: "What is your pricing model for dedicated Three.js developers?",
        answer:
          "Available full-time (160 hrs/mo at ₹2,30,000/mo) or part-time (80 hrs/mo at ₹1,25,000/mo) with a 1-week risk-free trial.",
      },
    ],
  },
};

export interface SolutionLandingPageData {
  slug: string;
  badge: string;
  h1: string;
  h1Italic: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  features: {
    title: string;
    description: string;
  }[];
  architecturePoints: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SOLUTION_LANDING_PAGES: Record<string, SolutionLandingPageData> = {
  "b2b-wholesale-ecommerce-platform": {
    slug: "b2b-wholesale-ecommerce-platform",
    badge: "B2B Wholesale Portal",
    h1: "B2B Wholesale eCommerce Platform",
    h1Italic: "Permanent Source Code License",
    subtitle:
      "Automated GSTIN verification, tiered volume pricing, custom quotation workflows, and invoice generation. Deploy in your cloud with zero GMV cuts.",
    metaTitle: "B2B Wholesale eCommerce Platform Source Code | Turnkey License",
    metaDescription:
      "Launch your B2B wholesale commerce portal with full source code ownership. Tiered bulk pricing, GST validation, credit terms, and 0% revenue commissions.",
    keywords: [
      "b2b wholesale ecommerce platform",
      "wholesale portal source code",
      "b2b ecommerce software license",
      "tiered volume pricing ecommerce",
      "turnkey b2b commerce script",
      "self hosted b2b wholesale portal",
    ],
    features: [
      {
        title: "Tiered Volume Pricing",
        description: "Configure dynamic price brackets by order volume (e.g. 10+ units, 50+ units, 500+ units) with automatic wholesale cart discounting.",
      },
      {
        title: "Automated GSTIN / Tax ID Verification",
        description: "Instant government API validation of buyer business credentials, tax registrations, and legal company names before unlocking wholesale rates.",
      },
      {
        title: "Commercial Quotation Workflows",
        description: "Buyers submit custom bulk inquiries; operators review, adjust margin discounts, and issue binding quotes payable directly online.",
      },
      {
        title: "Credit Terms & Ledger Management",
        description: "Support Net-30, Net-60 credit terms, automated GST tax invoices, delivery challans, and real-time account balances.",
      },
    ],
    architecturePoints: [
      "Next.js 16 Server Components storefront with wholesale authentication gates",
      "Role-based operator admin panel with wholesale customer approval pipeline",
      "PostgreSQL relational schema with transactional inventory allocation",
      "Automated PDF generation for tax invoices and delivery receipts",
    ],
    faqs: [
      {
        question: "Can both retail and wholesale customers use the same platform?",
        answer:
          "Yes! The platform includes dual retail and wholesale mode. Verified wholesale buyers log in to unlock wholesale rates, while retail guests browse consumer pricing.",
      },
      {
        question: "Are there any percentage fees or GMV commissions on wholesale orders?",
        answer:
          "Never. We charge 0% commission. You pay once for the permanent source code license and host it in your own private cloud accounts.",
      },
      {
        question: "Can we connect our existing ERP or accounting software?",
        answer:
          "Yes. The backend provides clean RESTful APIs and webhooks for two-way synchronization with Tally, SAP, Zoho Books, or custom internal ERPs.",
      },
    ],
  },
  "nextjs-ecommerce-clone-script": {
    slug: "nextjs-ecommerce-clone-script",
    badge: "Next.js 16 Storefront",
    h1: "Next.js 16 eCommerce Platform Clone",
    h1Italic: "Production-Hardened Source Code",
    subtitle:
      "Own the complete source code powering dariyo.in. Ultra-fast App Router storefront, 3D Canvas visualizer, React 19 operator admin console, and Node.js backend.",
    metaTitle: "Next.js 16 eCommerce Clone Script | Full Source Code License",
    metaDescription:
      "Buy the complete Next.js 16 and React 19 eCommerce platform source code. Turnkey storefront, operator admin panel, backend API, 0% GMV cut, self-hosted.",
    keywords: [
      "nextjs ecommerce clone script",
      "buy ecommerce source code",
      "next.js 16 online store clone",
      "react operator admin console",
      "self hosted ecommerce platform",
      "turnkey ecommerce script India",
    ],
    features: [
      {
        title: "Next.js 16 App Router Storefront",
        description: "Modern SSR architecture with sub-second page loads, instant cart, and 95+ Core Web Vitals scores.",
      },
      {
        title: "Interactive 3D Product Canvas",
        description: "Interactive Three.js and Google Model Viewer 3D product visualizer that boosts buyer engagement and conversions.",
      },
      {
        title: "React 19 Operator Admin Console",
        description: "Full operations suite: live order fulfillment pipeline, inventory batches, discount codes, visitor analytics, and CMS.",
      },
      {
        title: "Integrated Payment & Logistics Webhooks",
        description: "Plug-and-play Razorpay, Stripe, and Cash on Delivery with automatic pincode delivery validation and SMS/WhatsApp webhooks.",
      },
    ],
    architecturePoints: [
      "100% Type-safe TypeScript across storefront, admin console, and backend",
      "Docker Compose scripts for one-command local and cloud server deployment",
      "Redis caching layer for sub-10ms catalog reads and rate limiting",
      "Zero recurring software licensing fees — permanent ownership",
    ],
    faqs: [
      {
        question: "What exactly do I receive upon purchasing the clone?",
        answer:
          "You receive complete, unminified source code repositories for all 3 applications: Storefront (`dariyo-frontend`), Admin Panel (`dryfish-admin-panel`), and Backend API (`dryfish-backend`), along with full setup documentation.",
      },
      {
        question: "Do you install and deploy the platform on our cloud servers?",
        answer:
          "Yes. Our Growth and Complete packages include turnkey cloud setup on your AWS, Hetzner, or VPS accounts, domain configuration, and SSL provisioning.",
      },
      {
        question: "Can our developers customize the look, feel, and features?",
        answer:
          "Yes. The code is clean, idiomatic TypeScript with zero obfuscation. Your in-house team or our dedicated developers can customize it without restrictions.",
      },
    ],
  },
  "self-hosted-ecommerce-alternative": {
    slug: "self-hosted-ecommerce-alternative",
    badge: "Shopify & Medusa Alternative",
    h1: "Self-Hosted eCommerce Platform Alternative",
    h1Italic: "Zero Revenue Cuts. Zero Lock-In.",
    subtitle:
      "Tired of paying 2% GMV commissions, monthly app subscriptions, and losing control of your customer data? Own your commerce stack permanently.",
    metaTitle: "Self-Hosted Shopify & Medusa Alternative | Zero Commission Platform",
    metaDescription:
      "A complete self-hosted alternative to Shopify, MedusaJS, and Magento. Permanent source code license, 0% GMV cut, hosted in your cloud accounts.",
    keywords: [
      "self hosted shopify alternative",
      "medusajs alternative with admin panel",
      "zero commission ecommerce platform",
      "open source ecommerce alternative",
      "buy ecommerce platform source code",
      "own your ecommerce data",
    ],
    features: [
      {
        title: "0% Recurring Commissions",
        description: "Stop giving away 1% to 3% of your gross merchandise value. Pay only for the initial license and your own server hosting.",
      },
      {
        title: "100% Private Cloud Ownership",
        description: "Your database, customer lists, order records, and analytics remain strictly in your company cloud accounts. Zero third-party lock-in.",
      },
      {
        title: "Included Operator Admin Suite",
        description: "Unlike headless engines that require you to build an admin panel from scratch, Dariyo includes a complete React 19 operator console.",
      },
      {
        title: "Extensible Architecture",
        description: "Built with standard TypeScript, React 19, Next.js 16, and PostgreSQL. Any modern developer can modify and maintain the code.",
      },
    ],
    architecturePoints: [
      "Hosting costs as low as $15–$50/month on Hetzner or AWS VPS",
      "Fully compliant with Indian and global data privacy standards",
      "Pre-integrated with Razorpay, Stripe, Cashfree, and WhatsApp notifications",
      "Permanent commercial license to use and modify for your brand",
    ],
    faqs: [
      {
        question: "Why choose Dariyo over Shopify?",
        answer:
          "Shopify charges monthly fees, 2% transaction fees if not using their gateway, and forces you to pay recurring fees for dozens of plugins. With Dariyo, you pay once, own the source code, pay 0% commission, and customize anything.",
      },
      {
        question: "Why choose Dariyo over MedusaJS or Saleor?",
        answer:
          "Medusa and Saleor are headless engines requiring hundreds of hours of custom engineering to build a production storefront and operator panel. Dariyo gives you a complete, ready-to-launch system today.",
      },
      {
        question: "How difficult is it to maintain self-hosted servers?",
        answer:
          "Our automated Docker Compose setup runs seamlessly with minimal maintenance. We also offer optional Active Support ($199/mo) if you prefer our team to handle server updates.",
      },
    ],
  },
  "compare-ecommerce-platforms": {
    slug: "compare-ecommerce-platforms",
    badge: "Architecture & TCO Matrix",
    h1: "eCommerce Platform Architecture Comparison",
    h1Italic: "Dariyo vs Shopify Plus vs MedusaJS vs In-House",
    subtitle:
      "A complete technical and financial evaluation of owning a permanent Next.js commerce license versus paying 2% GMV to Shopify Plus or building from scratch.",
    metaTitle: "Dariyo vs Shopify vs MedusaJS vs Scratch | Commerce Platform Comparison",
    metaDescription:
      "Detailed architectural and 3-year TCO comparison of Dariyo Commerce Clone vs Shopify Plus, MedusaJS, and custom engineering. 0% GMV cut, full source code.",
    keywords: [
      "shopify alternative self hosted",
      "medusajs vs shopify clone",
      "buy ecommerce clone vs custom development",
      "b2b ecommerce platform comparison",
      "zero gmv ecommerce platforms",
      "ecommerce total cost of ownership calculator",
      "shopify plus alternatives for high volume brands",
    ],
    features: [
      {
        title: "0% Revenue Tax vs 2% Shopify GMV",
        description: "On $2,000,000 annual GMV, Shopify Plus takes $40,000 to $60,000 every single year in transaction cuts and app subscriptions. Dariyo charges 0% commission.",
      },
      {
        title: "100% Full Source Code Rights",
        description: "Receive unminified TypeScript code for the Next.js 16 storefront, React 19 admin panel, and Express/FastAPI backend with complete freedom to customize.",
      },
      {
        title: "48-Hour Turnkey Deployment",
        description: "Headless frameworks like Medusa or Saleor require 400 to 600 hours of custom frontend and admin engineering. Dariyo deploys live in 2 days.",
      },
      {
        title: "Native B2B Wholesale Out-of-the-Box",
        description: "Automated GSTIN/Tax ID verification, tiered volume price brackets, and commercial quote requests are built-in without expensive third-party apps.",
      },
    ],
    architecturePoints: [
      "Next.js 16 App Router with React 19 Concurrent rendering and 95+ Core Web Vitals",
      "Interactive 3D Three.js product viewer pre-integrated for high-converting visual demos",
      "Production Docker Compose deployment for AWS, Hetzner, DigitalOcean, or private VPS",
      "Dedicated developer staffing available for custom integrations and ERP connectors",
    ],
    faqs: [
      {
        question: "How does Dariyo compare to Shopify Plus in 3-year Total Cost of Ownership (TCO)?",
        answer:
          "For a business doing $1M/year GMV: Shopify Plus costs ~$2,000/month base plus transaction fees and apps, totaling over $85,000 over 3 years. Dariyo costs a one-time setup fee ($2,100–$8,500) plus your own hosting ($30/mo), totaling under $5,000 over 3 years — saving over $80,000.",
      },
      {
        question: "Why not build from scratch with MedusaJS or Saleor?",
        answer:
          "MedusaJS and Saleor are backend frameworks; you still need to design and code a production storefront, an operator admin panel, authentication, and payment flows — typically 4 to 6 months of senior engineering ($40,000+). Dariyo provides all three layers turnkey today.",
      },
      {
        question: "Can we still use Shopify apps or third-party logistics?",
        answer:
          "Dariyo includes native equivalents for common apps (analytics, wholesale pricing, banners, SEO tags, coupons). Furthermore, our open REST APIs allow connecting Shiprocket, Delhivery, Stripe, Razorpay, or custom ERPs without ongoing app store subscriptions.",
      },
    ],
  },
  "multi-vendor-marketplace-platform": {
    slug: "multi-vendor-marketplace-platform",
    badge: "Marketplace Engine",
    h1: "Multi-Vendor Marketplace eCommerce Platform",
    h1Italic: "Permanent Commercial Source Code",
    subtitle:
      "Launch your own multi-seller marketplace with supplier onboarding portals, vendor dashboards, automated commission splits, and unified buyer checkout.",
    metaTitle: "Multi-Vendor Marketplace Clone Script | Source Code License | Dariyo",
    metaDescription:
      "Buy the complete multi-vendor marketplace platform source code. Dedicated vendor portals, commission payouts, multi-warehouse inventory, and 0% GMV license fee.",
    keywords: [
      "multi vendor marketplace clone script",
      "buy marketplace source code",
      "amazon clone nextjs",
      "multi vendor ecommerce platform source code",
      "b2b marketplace script",
      "self hosted multi vendor platform",
    ],
    features: [
      {
        title: "Dedicated Vendor Portals",
        description: "Suppliers receive private dashboards to list products, manage inventory stock batches, track orders, and request automated payouts.",
      },
      {
        title: "Automated Commission Splits",
        description: "Configure dynamic commission rules per category, vendor tier, or fixed fee with automated split payouts via Stripe Connect or Razorpay Route.",
      },
      {
        title: "Unified Cart & Multi-Origin Shipping",
        description: "Customers purchase from multiple distinct vendors in a single checkout, with orders automatically split by seller for fulfillment.",
      },
      {
        title: "Operator Admin Governance",
        description: "Platform admins approve new vendor applications, monitor dispute resolutions, verify KYC/GSTIN documents, and audit settlement balances.",
      },
    ],
    architecturePoints: [
      "Multi-tenant PostgreSQL schema with isolated vendor data scoping and audit logs",
      "Next.js 16 storefront with lightning-fast catalog search and facet filters",
      "Automated Stripe Connect & Razorpay Route webhook listeners for instant payouts",
      "Permanent commercial ownership with 0% recurring platform rev-share",
    ],
    faqs: [
      {
        question: "How do vendor commission payouts work?",
        answer:
          "The platform supports automated payout splits via Stripe Connect, Razorpay Route, or manual bank wire transfers with scheduled settlement periods (e.g. Net-7 or Net-14 days).",
      },
      {
        question: "Can vendors manage their own shipping and courier pickups?",
        answer:
          "Yes. Vendors configure their warehouse pickup locations and generate individual shipping labels and delivery challans for each sub-order.",
      },
      {
        question: "Is there a limit on the number of vendors or products?",
        answer:
          "None. You own the code and database. You can host thousands of vendors and millions of SKUs in your cloud without per-seat or per-vendor surcharges.",
      },
    ],
  },
  "d2c-brand-ecommerce-platform": {
    slug: "d2c-brand-ecommerce-platform",
    badge: "D2C Lifestyle & FMCG",
    h1: "D2C Brand eCommerce Storefront Platform",
    h1Italic: "High-Conversion Turnkey Source Code",
    subtitle:
      "Purpose-built for lifestyle, wellness, apparel, and direct-to-consumer FMCG brands. Sub-second page loads, 3D product visualizer, and 0% GMV tax.",
    metaTitle: "D2C Brand eCommerce Platform Source Code | High Conversion Store | Dariyo",
    metaDescription:
      "Launch a lightning-fast D2C brand store with full source code ownership. Next.js 16, 3D Three.js product viewer, sub-second checkout, 0% GMV cut, self-hosted.",
    keywords: [
      "d2c ecommerce platform source code",
      "direct to consumer store script",
      "shopify alternative for d2c brands",
      "custom d2c storefront nextjs",
      "turnkey brand ecommerce script",
      "buy d2c brand store source code",
    ],
    features: [
      {
        title: "Sub-Second Page Loads & 95+ Core Web Vitals",
        description: "Next.js 16 SSR and edge asset caching eliminate sluggish theme bloat, boosting conversion rates and lowering paid ad bounce rates.",
      },
      {
        title: "Interactive 3D Three.js Canvas",
        description: "Let shoppers inspect product dimensions, textures, packaging, and color variations in full 360-degree interactive 3D.",
      },
      {
        title: "1-Click Express Checkout",
        description: "Streamlined checkout with address auto-complete, Razorpay, UPI QR codes, Apple Pay, Google Pay, and Cash on Delivery verification.",
      },
      {
        title: "Integrated Marketing & Abandoned Cart Recovery",
        description: "Native WhatsApp and SMS cart recovery webhooks, promo codes, bundle builder, and server-side Meta Conversions API (CAPI).",
      },
    ],
    architecturePoints: [
      "Next.js 16 App Router with React 19 concurrent features and fluid micro-animations",
      "Integrated Facebook / Meta Pixel and Google Tag Manager with server-side CAPI events",
      "Pre-integrated Shiprocket and Delhivery courier tracking webhooks",
      "Zero recurring GMV fees — save tens of thousands of dollars as your brand scales",
    ],
    faqs: [
      {
        question: "How does this compare to running a D2C store on Shopify?",
        answer:
          "A high-growth D2C brand doing $100k/month GMV on Shopify pays $2,000 to $3,500 every month in transaction cuts and plugin subscriptions. Dariyo charges 0% commission, gives you complete brand design control, and sub-second page speeds.",
      },
      {
        question: "Can we track Facebook / Meta Ads conversions accurately without iOS 14 loss?",
        answer:
          "Yes! The backend includes server-side Meta Conversions API (CAPI) events that fire directly from the server on payment confirmation, bypassing browser ad-blockers.",
      },
      {
        question: "How easy is it to update banners, products, and discounts?",
        answer:
          "The included React 19 operator admin console provides an intuitive visual dashboard to update banners, hero copy, products, pricing variants, and flash coupons in seconds.",
      },
    ],
  },
};

