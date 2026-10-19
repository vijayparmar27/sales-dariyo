import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

import { Accent, plainHeading } from "@/components/content/accent";
import { socialOf } from "@/components/content/social-icon";
import { CatalisBadge } from "@/components/ui";
import { site } from "@/config/site";
import { getContactChannels, getPage } from "@/lib/site-api";

import { ContactFormArea } from "./contact-form";

/** Read from the admin panel; refreshed at once by a save there, or after five minutes. */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("contact");
  return {
    title: page.seo.title || plainHeading(page.hero.heading),
    description: page.seo.description || page.hero.intro,
    alternates: { canonical: "/contact" },
  };
}

/** "919876543210" → "+91 98765 43210"; any other number keeps its digits after a +. */
const prettyPhone = (digits: string) =>
  /^91\d{10}$/.test(digits) ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}` : `+${digits}`;

/**
 * The contact page, after Catalis's Contact V3: the heading on the left and
 * the form in a soft grey card on the right, with the ways to reach the seller
 * under the heading. Every word and every field comes from the admin panel.
 */
export default async function ContactPage() {
  const [page, channels] = await Promise.all([getPage("contact"), getContactChannels()]);

  const ways: { icon: LucideIcon; label: string; value: string; href?: string; external?: boolean }[] = [];
  if (channels.email) ways.push({ icon: Mail, label: "Email", value: channels.email, href: `mailto:${channels.email}` });
  if (channels.whatsapp) {
    ways.push({
      icon: MessageCircle,
      label: "WhatsApp",
      value: prettyPhone(channels.whatsapp),
      href: `https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I'd like to know more about the ${site.product}.`)}`,
      external: true,
    });
  }
  if (channels.phone) ways.push({ icon: Phone, label: "Phone", value: channels.phone, href: `tel:${channels.phone.replace(/[^\d+]/g, "")}` });
  if (channels.address) {
    ways.push({
      icon: MapPin,
      label: "Office",
      value: channels.address,
      ...(channels.mapUrl ? { href: channels.mapUrl, external: true } : {}),
    });
  }
  if (channels.hours) ways.push({ icon: Clock, label: "Hours", value: channels.hours });

  return (
    // pt-28: the site header is fixed over the page, not in its flow.
    <section className="px-4 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-5 lg:pt-10">
          {page.hero.eyebrow ? <CatalisBadge className="mb-6">{page.hero.eyebrow}</CatalisBadge> : null}
          <h1 className="font-serif text-[3.6rem] leading-[0.98] tracking-[-0.03em] text-balance text-ink sm:text-7xl lg:text-[5.25rem]">
            <Accent text={page.hero.heading} />
          </h1>
          {page.hero.intro ? (
            <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg">{page.hero.intro}</p>
          ) : null}

          {ways.length > 0 ? (
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {ways.map(({ icon: Icon, label, value, href, external }) => {
                const body = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-medium tracking-[0.12em] text-muted uppercase">{label}</span>
                      <span className="mt-0.5 block text-[15px] font-medium break-words whitespace-pre-line text-ink">{value}</span>
                    </span>
                    {href ? (
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      />
                    ) : null}
                  </>
                );
                const classes = "group flex items-center gap-4 rounded-2xl bg-sunken px-4 py-3.5 transition-colors";
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className={`${classes} hover:bg-[#ECF0F6] focus-visible:outline-2 focus-visible:outline-ring`}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={classes}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}

          {page.socials.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Elsewhere">
              {page.socials.map(({ platform, url }) => {
                const { label, icon: Icon } = socialOf(platform);
                return (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex size-11 items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-ink/20 hover:bg-sunken hover:text-ink"
                    >
                      <Icon aria-hidden className="size-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[28px] bg-sunken p-5 sm:rounded-[2.25rem] sm:p-8 lg:p-10">
            <ContactFormArea form={page.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
