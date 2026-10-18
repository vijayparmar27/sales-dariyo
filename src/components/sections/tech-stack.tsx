import { Shield } from "lucide-react";

import { SectionHeading } from "@/components/ui";

export function TechStack() {
  const stackLayers = [
    {
      role: "Customer Storefront",
      tech: "Next.js 16, React 19, Tailwind CSS v4",
      why: "Fast server-rendered pages that rank high on Google and revalidate the instant your admin changes a product or price.",
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
      why: "Responsive data grids, quick catalog filtering, and checked forms that make day-to-day warehouse dispatch effortless.",
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
      why: "Flexible schema for complex product variants, high-speed cart caching, and live parcel tracking updates without refreshing.",
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
    <section id="technology" className="scroll-mt-24 py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Engineering Integrity"
          title={
            <>
              Modern, Proven Stack.{" "}
              <span className="italic font-serif font-normal text-muted">
                Built Purely in TypeScript.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        >
          No proprietary obscure languages or locked black boxes. Every component is built on open standards that any professional JavaScript engineer can understand, maintain, and scale.
        </SectionHeading>

        {/* Dark Refined Technical Architecture Card */}
        <div className="rounded-3xl border border-white/10 bg-[#0F101A] p-6 sm:p-10 shadow-2xl text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <p className="text-sm font-bold text-[#60A5FA] tracking-wide uppercase">
                System Topology &amp; Stack Directory
              </p>
              <p className="text-xs text-white/60 mt-0.5">
                Organized by architectural domain · Zero vendor lock-in
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-white/80">Production Hardened</span>
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
              <span>Deployable on AWS, DigitalOcean, Vercel, or your own dedicated bare metal.</span>
            </div>
            <span className="font-mono text-[#60A5FA]">Single Source of Truth Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
