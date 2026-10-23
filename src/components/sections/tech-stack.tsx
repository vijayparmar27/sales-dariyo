"use client";

import { Shield } from "lucide-react";

import { SectionHeading } from "@/components/ui";
import { useI18n } from "@/lib/i18n/context";

export function TechStack() {
  const { t } = useI18n();

  const stackLayers = [
    {
      role: t.techStack.layers.storefront.role,
      tech: "Next.js 16, React 19, Tailwind CSS v4",
      why: t.techStack.layers.storefront.why,
      tag: t.techStack.layers.storefront.tag,
    },
    {
      role: t.techStack.layers.mobile.role,
      tech: "React Native, Expo, iOS & Android",
      why: t.techStack.layers.mobile.why,
      tag: t.techStack.layers.mobile.tag,
    },
    {
      role: t.techStack.layers.experience.role,
      tech: "Three.js (React Three Fiber), GSAP",
      why: t.techStack.layers.experience.why,
      tag: t.techStack.layers.experience.tag,
    },
    {
      role: t.techStack.layers.operations.role,
      tech: "Next.js, TanStack Query & Table, Zod",
      why: t.techStack.layers.operations.why,
      tag: t.techStack.layers.operations.tag,
    },
    {
      role: t.techStack.layers.backend.role,
      tech: "Node.js (Express 5) & FastAPI (Python)",
      why: t.techStack.layers.backend.why,
      tag: t.techStack.layers.backend.tag,
    },
    {
      role: t.techStack.layers.developers.role,
      tech: "Node.js, React.js, Next.js, React Native, FastAPI",
      why: t.techStack.layers.developers.why,
      tag: t.techStack.layers.developers.tag,
    },
    {
      role: t.techStack.layers.data.role,
      tech: "MongoDB Atlas, Redis, Socket.IO",
      why: t.techStack.layers.data.why,
      tag: t.techStack.layers.data.tag,
    },
    {
      role: t.techStack.layers.integrations.role,
      tech: "Razorpay & Delhivery APIs",
      why: t.techStack.layers.integrations.why,
      tag: t.techStack.layers.integrations.tag,
    },
    {
      role: t.techStack.layers.auth.role,
      tech: "Firebase Authentication",
      why: t.techStack.layers.auth.why,
      tag: t.techStack.layers.auth.tag,
    },
    {
      role: t.techStack.layers.security.role,
      tech: "Cloudflare, Docker, AES-256-GCM",
      why: t.techStack.layers.security.why,
      tag: t.techStack.layers.security.tag,
    },
  ];

  return (
    <section id="technology" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.techStack.eyebrow}
          title={
            <>
              {t.techStack.titlePart1}{" "}
              <span className="italic text-muted">{t.techStack.titleItalic}</span>
            </>
          }
          align="center"
          className="mb-14"
        >
          {t.techStack.subtitle}
        </SectionHeading>

        {/* Dark Refined Technical Architecture Card */}
        <div className="reveal rounded-[28px] bg-[#111218] p-6 text-white sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <p className="font-serif text-3xl tracking-[-0.01em] text-white">{t.techStack.layerTitle}</p>
              <p className="mt-1 text-xs text-white/60">{t.techStack.layerSubtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/80">{t.techStack.liveStoreBadge}</span>
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
              <span>{t.techStack.guarantee}</span>
            </div>
            <span className="text-[#7FB2FF]">{t.techStack.singleSource}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
