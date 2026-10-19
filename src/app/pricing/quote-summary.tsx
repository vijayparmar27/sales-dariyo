import { MessageCircle, Mail } from "lucide-react";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/site-header";
import { buttonClass } from "@/components/ui";
import { site } from "@/config/site";
import { LICENCE, SETUP_INCLUDES } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { rupees, weeks } from "@/lib/format";
import type { Quote } from "@/lib/quote";

import { QuoteActions } from "./pending";
import { CopyLinkButton, PrintButton } from "./quote-buttons";

/**
 * The quote, rendered on the server from figures `buildQuote` worked out. It
 * is also the printed quote: on paper the configurator disappears and this
 * card gets a letterhead, the date, the link back and the terms.
 */
export function QuoteSummary({
  quote,
  shareUrl,
  whatsappHref,
  mailHref,
  issuedOn,
}: {
  quote: Quote;
  shareUrl: string;
  whatsappHref: string | null;
  mailHref: string | null;
  issuedOn: string;
}) {
  const gstLabel = quote.gstPercent === null ? null : `GST ${quote.gstPercent}%`;
  const hasPlan = quote.support.fee > 0;

  return (
    <div className="rounded-3xl border border-line bg-card p-6 shadow-sm print:rounded-none print:border-0 print:p-0 print:shadow-none">
      <div className="mb-8 hidden items-start justify-between gap-6 border-b border-line pb-6 print:flex">
        <div className="flex items-center gap-3">
          <BrandMark className="size-10" />
          <div>
            <p className="text-lg font-semibold">{site.name}</p>
            <p className="text-sm text-muted">{site.product}</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p className="font-semibold">Quote</p>
          <p className="text-muted">{issuedOn}</p>
        </div>
      </div>

      <h2 className="font-serif text-3xl tracking-[-0.01em]">Your quote</h2>
      <p className="sr-only" aria-live="polite">
        {`Setup total ${rupees(quote.setup.total)}. ${hasPlan ? `Monthly ${rupees(quote.support.total)}.` : "No monthly plan."}`}
      </p>

      <Block title="One-time setup">
        {quote.modules.map((line) => (
          <Row key={line.id} label={line.name} value={rupees(line.amount)} />
        ))}
        {gstLabel ? (
          <>
            <Row label="Subtotal" value={rupees(quote.setup.subtotal)} divider />
            <Row label={gstLabel} value={rupees(quote.setup.gst)} />
          </>
        ) : null}
        <Row label="Setup total" value={rupees(quote.setup.total)} strong divider />
      </Block>

      <Block title="Every month">
        {hasPlan ? (
          <>
            <Row
              label={`${quote.support.name} support, ${quote.support.hoursPerMonth} hours`}
              value={rupees(quote.support.fee)}
            />
            {gstLabel ? <Row label={gstLabel} value={rupees(quote.support.gst)} /> : null}
            <Row label="Monthly total" value={rupees(quote.support.total)} strong divider />
          </>
        ) : (
          <Row label="No support plan, pay by the hour" value={rupees(0)} />
        )}
        <div className="mt-3 rounded-xl bg-sunken p-3 text-sm">
          <div className="flex justify-between gap-4">
            <span>Hosting, paid to providers</span>
            <span className="font-semibold whitespace-nowrap tabular-nums">
              about {rupees(quote.hosting.total)}
            </span>
          </div>
          <details className="mt-1 text-muted print:hidden">
            <summary className="cursor-pointer text-xs">{quote.hosting.name} estimate, item by item</summary>
            <HostingItems quote={quote} />
          </details>
          <div className="hidden text-muted print:block">
            <HostingItems quote={quote} />
          </div>
        </div>
      </Block>

      <Block title={`Launch in about ${weeks(quote.launchWeeks)}`}>
        <p className="text-sm text-muted">
          {`${quote.setupDays} working days of setup from kick-off. The setup fee is paid in ${quote.payments.length} parts:`}
        </p>
        <div className="mt-2">
          {quote.payments.map((stage) => (
            <Row key={stage.label} label={`${stage.label} (${stage.percent}%)`} value={rupees(stage.amount)} />
          ))}
        </div>
      </Block>

      <QuoteActions className="mt-6 grid gap-2 print:hidden">
        {whatsappHref ? (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
            <MessageCircle aria-hidden className="size-4" />
            Send this quote on WhatsApp
          </a>
        ) : null}
        {mailHref ? (
          <a href={mailHref} className={buttonClass(whatsappHref ? "secondary" : "primary")}>
            <Mail aria-hidden className="size-4" />
            Email this quote
          </a>
        ) : null}
        <div className="grid grid-cols-2 gap-2">
          <CopyLinkButton url={shareUrl} />
          <PrintButton />
        </div>
        {!whatsappHref && !mailHref && process.env.NODE_ENV !== "production" ? (
          <p className="text-xs text-muted">
            Add a WhatsApp number or email in the admin panel (Sales site → Site pages → Contact), or in
            src/config/site.ts, to show the send buttons.
          </p>
        ) : null}
      </QuoteActions>

      <div className="mt-8 hidden border-t border-line pt-6 text-sm print:block">
        <p className="font-semibold">Every setup includes</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {SETUP_INCLUDES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4">{LICENCE}</p>
        <p className="mt-4 text-muted">
          {gstLabel ? `Amounts in Indian rupees; ${gstLabel} shown separately. ` : "Amounts in Indian rupees. "}
          {/* break-all: the query string has no break points of its own, and
              with ten or more modules the unbroken link widened the printed
              card past the page, clipping every amount on the right. */}
          This quote online: <span className="break-all">{shareUrl}</span>
        </p>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 border-t border-line pt-5 first-of-type:mt-5">
      <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">{title}</h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
  strong = false,
  divider = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  divider?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between gap-4 py-1 text-sm",
        divider && "mt-1 border-t border-dashed border-line pt-2",
        strong && "text-base font-semibold",
      )}
    >
      <span className="min-w-0">{label}</span>
      <span className="whitespace-nowrap tabular-nums">{value}</span>
    </div>
  );
}

function HostingItems({ quote }: { quote: Quote }) {
  return (
    <ul className="mt-2 space-y-1 text-xs">
      {quote.hosting.items.map((item) => (
        <li key={item.name} className="flex justify-between gap-3">
          <span>
            {item.name}
            <span className="block opacity-80">{item.provider}</span>
          </span>
          <span className="whitespace-nowrap tabular-nums">{rupees(item.monthly)}</span>
        </li>
      ))}
    </ul>
  );
}

export function QuoteTotals({ quote }: { quote: Quote }) {
  const gst = quote.gstPercent !== null;
  const second =
    quote.support.fee > 0
      ? `then ${rupees(quote.support.total)} a month${gst ? ", incl. GST" : ""}`
      : gst
        ? "incl. GST, no monthly plan"
        : "no monthly plan";
  return (
    <p className="text-sm leading-tight">
      <span className="block font-semibold tabular-nums">{rupees(quote.setup.total)} setup</span>
      <span className="text-muted tabular-nums">{second}</span>
    </p>
  );
}
