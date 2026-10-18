import { ArrowRight, Check, ExternalLink, Sparkles } from "lucide-react";

import { ButtonLink, CatalisBadge, ExternalButton } from "@/components/ui";
import { site } from "@/config/site";

export function FinalCta() {
  const showcase = site.showcase.enabled ? site.showcase : null;

  return (
    <section className="py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#13141F] to-[#0A0B10] p-8 sm:p-14 lg:p-20 text-white shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,84,249,0.3)_0%,rgba(75,140,228,0.15)_45%,transparent_75%)] blur-3xl -z-10"
          />

          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <CatalisBadge variant="blue" className="mb-6">
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="size-3.5" />
                <span>Ready to Launch in Weeks</span>
              </span>
            </CatalisBadge>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Your Next Store Starts With the{" "}
              <span className="italic font-serif font-normal text-white underline decoration-[#0054F9] decoration-wavy decoration-2 underline-offset-8">
                Right Foundation.
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl text-pretty font-normal">
              Choose the capabilities your business needs, receive an instant itemized proposal, and launch a branded commerce platform with zero recurring software commission.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink
                href="/pricing"
                variant="blue"
                className="px-8 py-4 text-base font-bold shadow-lg"
              >
                Build Your Package
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>

              {showcase ? (
                <ExternalButton
                  href={showcase.url}
                  variant="outline-dark"
                  className="px-7 py-4 text-base font-semibold"
                >
                  Explore the Live Example ({showcase.name})
                  <ExternalLink aria-hidden className="size-4 text-white/70" />
                </ExternalButton>
              ) : (
                <ButtonLink
                  href="/#apps"
                  variant="outline-dark"
                  className="px-7 py-4 text-base font-semibold"
                >
                  Review Platform Features
                  <ArrowRight aria-hidden className="size-4 text-white/70" />
                </ButtonLink>
              )}
            </div>

            {/* Floating Status Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 pt-8 border-t border-white/10 text-xs text-white/80 font-medium">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5">
                <Check className="size-3.5 text-[#3B82F6]" />
                <span>Permanent Full Source License</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5">
                <Check className="size-3.5 text-[#3B82F6]" />
                <span>Zero Commission on Sales</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5">
                <Check className="size-3.5 text-[#3B82F6]" />
                <span>Deployed in Your Cloud Accounts</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
