import { Shield } from "lucide-react";

import { SectionHeading } from "@/components/ui";

export function TechStack() {
  const stackLayers = [
    {
      role: "Customer Storefront",
      tech: "Next.js 16, React 19, Tailwind CSS v4",
      why: "Fast server-rendered pages that search engines can read, refreshed the moment your admin changes a product or price.",
      tag: "Storefront",
    },
    {
      role: "3D Visuals & Animation",
      tech: "Three.js (React Three Fiber), GSAP",
      why: "Interactive 3D pack models and smooth animations that run performantly across both mobile phones and desktop displays.",
      tag: "Experience",
    },
    {
      role: "Admin Operations Console",
      tech: "Next.js, TanStack Query & Table, Zod",
      why: "Fast tables, quick filters and checked forms for the work your team does every day.",
      tag: "Operations",
    },
    {
      role: "Commerce Core Backend",
      tech: "Node.js, Express 5, TypeScript",
      why: "Every inventory reservation and pricing calculation in one centralized authority, so store and warehouse never disagree.",
      tag: "Engine",
    },
    {
      role: "Database & Live Telemetry",
      tech: "MongoDB Atlas, Redis, Socket.IO",
      why: "Flexible records for products and their packs, Redis for speed and rate limits, and live order updates without refreshing.",
      tag: "Data",
    },
    {
      role: "Indian Payments & Carrier Webhooks",
      tech: "Razorpay & Delhivery APIs",
      why: "Native UPI intent, card gateways, and Delhivery courier tracking backed by cryptographically signed HMAC webhooks.",
      tag: "Integrations",
    },
    {
      role: "Customer Identity & Sign-In",
      tech: "Firebase Authentication",
      why: "Frictionless sign-in with Google, mobile OTP (SMS), or email without managing risky credential databases yourself.",
      tag: "Auth",
    },
    {
      role: "Cloud Security & Infrastructure",
      tech: "Cloudflare, Docker, AES-256-GCM",
      why: "DDoS flood defense, single-container deployments in your cloud, and sensitive gateway credentials encrypted at rest.",
      tag: "Security",
    },
  ];

  return (
    <section id="technology" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technology"
          title={
            <>
              A modern, proven stack.{" "}
              <span className="italic text-muted">All in TypeScript.</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          No obscure languages and no black boxes. Any good JavaScript developer can read, maintain
          and extend every part of it.
        </SectionHeading>

        {/* Dark Refined Technical Architecture Card */}
        <div className="reveal rounded-[28px] bg-[#111218] p-6 text-white sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <p className="font-serif text-3xl tracking-[-0.01em] text-white">The stack, layer by layer</p>
              <p className="mt-1 text-xs text-white/60">Open-source tools throughout · no vendor lock-in</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/80">Running a live store</span>
            </div>
          </div>

          <div className="mt-6 divide-y divide-white/10">
            {stackLayers.map((layer) => (
              <div
                key={layer.role}
                className="grid gap-3 py-5 sm:grid-cols-12 sm:items-center sm:gap-6 hover:bg-white/[0.02] transition-colors rounded-xl px-2"
              >
                <div className="sm:col-span-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#0054F9]/20 border border-[#0054F9]/30 px-2 py-0.5 text-[10px] font-mono text-[#60A5FA] uppercase">
                      {layer.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {layer.role}
                    </h4>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <p className="font-mono text-xs sm:text-sm font-semibold text-white/90">
                    {layer.tech}
                  </p>
                </div>

                <div className="sm:col-span-5">
                  <p className="text-xs text-white/60 leading-relaxed">
                    {layer.why}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Infrastructure Guarantee Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-white/70 gap-4">
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-[#3B82F6]" />
              <span>The API runs in a Docker container on any cloud server; the two websites run beside it or on Vercel.</span>
            </div>
            <span className="text-[#7FB2FF]">One source of truth</span>
          </div>
        </div>
      </div>
    </section>
  );
}
