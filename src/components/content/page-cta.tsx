import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Accent } from "@/components/content/accent";
import { buttonClass, CatalisBadge, SkyPanel } from "@/components/ui";
import type { PageLink, SectionHead } from "@/lib/site-types";

/** A link from the panel: a page here goes through Next, anything else opens as a link out. */
export function CtaLink({ link, variant, className }: { link: PageLink; variant: "primary" | "white" | "secondary"; className?: string }) {
  if (!link.label || !link.href) return null;
  const classes = buttonClass(variant, className);
  if (link.href.startsWith("/") || link.href.startsWith("#")) {
    return (
      <Link href={link.href} className={classes}>
        {link.label}
        {variant === "primary" ? <ArrowRight aria-hidden className="size-4" /> : null}
      </Link>
    );
  }
  return (
    <a href={link.href} className={classes} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  );
}

/**
 * The closing sky panel, with the words from the panel: the reference's
 * "Join us" block, as `FinalCta` draws it on the home page.
 */
export function PageCta({ cta }: { cta: SectionHead & { visible: boolean; primary: PageLink; secondary: PageLink } }) {
  if (!cta.visible || !cta.heading) return null;
  return (
    <section className="px-3 py-3">
      <SkyPanel tone="deep" className="px-4 pt-24 pb-36 text-center sm:px-8 sm:pt-32 sm:pb-48">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          {cta.eyebrow ? (
            <CatalisBadge variant="white" className="reveal mb-6">
              {cta.eyebrow}
            </CatalisBadge>
          ) : null}
          <h2 className="reveal font-serif text-[2.9rem] leading-none tracking-[-0.03em] text-balance text-white sm:text-7xl">
            <Accent text={cta.heading} />
          </h2>
          {cta.intro ? (
            <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg">{cta.intro}</p>
          ) : null}
          <div className="reveal mt-10 flex w-full max-w-xs flex-col items-stretch gap-3 empty:hidden sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <CtaLink link={cta.primary} variant="primary" className="h-12 px-7 text-[15px]" />
            <CtaLink link={cta.secondary} variant="white" className="h-12 px-7 text-[15px]" />
          </div>
        </div>
      </SkyPanel>
    </section>
  );
}
