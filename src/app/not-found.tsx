import { ButtonLink } from "@/components/ui";
import { getServerI18n } from "@/lib/i18n/server";

export default async function NotFound() {
  const { t } = await getServerI18n();

  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6">
      <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">{t.notFound.eyebrow}</p>
      <h1 className="mt-3 font-serif text-6xl tracking-[-0.02em]">
        {t.notFound.titlePart1} <span className="italic text-muted">{t.notFound.titleItalic}</span>
      </h1>
      <p className="mt-4 text-muted">{t.notFound.subtitle}</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/pricing">{t.notFound.buildQuote}</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          {t.notFound.home}
        </ButtonLink>
      </div>
    </div>
  );
}
