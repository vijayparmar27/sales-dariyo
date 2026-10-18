import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { ButtonLink, CatalisBadge, ExternalButton, SkyPanel } from "@/components/ui";
import { site } from "@/config/site";

export function FinalCta() {
  const showcase = site.showcase.enabled ? site.showcase : null;

  return (
    <section className="px-3 py-3">
      <SkyPanel tone="deep" className="px-4 pt-24 pb-40 text-center sm:px-8 sm:pt-32 sm:pb-56">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <CatalisBadge variant="white" className="reveal mb-6">
            Ready when you are
          </CatalisBadge>

          <h2 className="reveal font-serif text-[2.9rem] leading-none tracking-[-0.03em] text-balance text-white sm:text-7xl">
            Your next store starts with the <span className="italic">right foundation.</span>
          </h2>

          <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg">
            Pick what your business needs, get an itemised quote in a minute, and launch a store in
            your own brand, with no commission on your sales.
          </p>

          <div className="reveal mt-10 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <ButtonLink href="/pricing" variant="primary" className="h-12 px-7 text-[15px]">
              Build Your Package
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            {showcase ? (
              <ExternalButton href={showcase.url} variant="white" className="h-12 px-7 text-[15px]">
                See it live at {showcase.name}
                <ArrowUpRight aria-hidden className="size-4" />
              </ExternalButton>
            ) : (
              <ButtonLink href="/#demo" variant="white" className="h-12 px-7 text-[15px]">
                Try the live demo
              </ButtonLink>
            )}
          </div>

          <ul className="reveal mt-10 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            {["Permanent source code licence", "No commission on sales", "Servers in your name"].map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-ink shadow-xs"
              >
                <Check aria-hidden className="size-3.5 text-brand-blue" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </SkyPanel>
    </section>
  );
}
