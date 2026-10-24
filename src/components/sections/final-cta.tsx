import { ArrowRight, ArrowUpRight, Check, MessageCircle, Phone } from "lucide-react";

import { ButtonLink, CatalisBadge, ExternalButton, SkyPanel } from "@/components/ui";
import { site } from "@/config/site";
import { getServerI18n } from "@/lib/i18n/server";
import { getContactChannels } from "@/lib/site-api";

/**
 * Final call-to-action banner section with localized copy and multi-channel actions.
 */
export async function FinalCta() {
  const [{ t }, showcase, channels] = await Promise.all([
    getServerI18n(),
    site.showcase.enabled ? site.showcase : null,
    getContactChannels(),
  ]);

  return (
    <section className="px-3 py-3">
      <SkyPanel tone="deep" className="px-4 pt-24 pb-40 text-center sm:px-8 sm:pt-32 sm:pb-56">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <CatalisBadge variant="white" className="reveal stagger-1 mb-6">
            {t.finalCta.badge}
          </CatalisBadge>

          <h2 className="reveal stagger-2 font-serif text-[2.9rem] leading-none tracking-[-0.03em] text-balance text-white sm:text-7xl">
            {t.finalCta.titlePart1} <span className="italic">{t.finalCta.titleItalic}</span>
          </h2>

          <p className="reveal stagger-3 mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg">
            {t.finalCta.subtitle}
          </p>

          <div className="reveal stagger-4 mt-10 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <ButtonLink href="/pricing" variant="primary" className="group h-12 px-7 text-[15px] shadow-lg transition-transform hover:scale-105">
              {t.finalCta.ctaQuote}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </ButtonLink>
            {showcase ? (
              <ExternalButton href={showcase.url} variant="white" className="group h-12 px-7 text-[15px] shadow-md transition-transform hover:scale-105">
                {t.finalCta.ctaDemo} ({showcase.name})
                <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </ExternalButton>
            ) : (
              <ButtonLink href="/#demo" variant="white" className="h-12 px-7 text-[15px] shadow-md transition-transform hover:scale-105">
                {t.finalCta.ctaDemo}
              </ButtonLink>
            )}
            {channels.whatsapp ? (
              <a
                href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I'd like to discuss launching our store on the platform.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-[15px] font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20 hover:scale-105"
              >
                <MessageCircle aria-hidden className="size-4 text-emerald-300" />
                <span>{t.finalCta.chatWithUs}</span>
              </a>
            ) : null}
            {channels.phone ? (
              <a
                href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-[15px] font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20 hover:scale-105"
              >
                <Phone aria-hidden className="size-4 text-white/90" />
                <span>{t.nav.callNow}</span>
              </a>
            ) : null}
          </div>

          <ul className="reveal stagger-5 mt-10 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            {t.hero.licenseText.split(" · ").map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-ink shadow-xs transition-transform duration-200 hover:scale-105"
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
