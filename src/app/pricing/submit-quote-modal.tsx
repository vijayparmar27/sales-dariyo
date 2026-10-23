"use client";

import { Check, CheckCircle2, Copy, Link2, Loader2, Mail, MessageCircle, Phone, Send, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { createPortal } from "react-dom";

import { buttonClass } from "@/components/ui";
import { formatCurrency, weeks } from "@/lib/format";
import type { Quote } from "@/lib/quote";
import type { ContactChannels } from "@/lib/site-types";

import { submitQuote } from "./actions";

interface SubmitQuoteModalProps {
  quote: Quote;
  shareUrl: string;
  channels?: ContactChannels;
}

export function SubmitQuoteModal({ quote, shareUrl, channels }: SubmitQuoteModalProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPending, startTransition] = useTransition();

  const modalRef = useRef<HTMLDivElement>(null);

  function openModal() {
    setError(null);
    setIsSuccess(false);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Handle ESC key to close
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function copyQuoteLink() {
    void navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSubmit(e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) {
    if (e) e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 6) {
      setError("Please enter a valid phone number so we can reach you.");
      return;
    }

    startTransition(async () => {
      const packageTitle = quote.modules.length > 0 ? `${quote.modules.length} Modules Selected` : "Custom Package";
      const monthlyTotal = quote.support.fee > 0 ? `${formatCurrency(quote.support.total, quote.currency)} / month` : "No monthly plan";
      const launchEstimate = `about ${weeks(quote.launchWeeks)}`;

      const res = await submitQuote({
        name,
        email,
        phone,
        company,
        requirements,
        packageTitle,
        setupTotal: formatCurrency(quote.setup.total, quote.currency),
        monthlyTotal,
        launchWeeks: launchEstimate,
        quoteUrl: shareUrl,
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setError(res.message || "Failed to submit quote. Please try again.");
      }
    });
  }

  const modalContent = isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      {/* Backdrop covering the entire page and header */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-[#111218]/70 backdrop-blur-sm transition-opacity"
      />

      {/* Dialog Container */}
      <div
        ref={modalRef}
        className="relative z-10 my-auto flex flex-col max-h-[90vh] w-full max-w-lg rounded-[28px] border border-line bg-card shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative border-b border-line/70 px-6 pt-6 pb-4 sm:px-7 sm:pt-7">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-5 right-5 rounded-full p-2 text-muted transition-colors hover:bg-sunken hover:text-ink cursor-pointer"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-[11px] font-semibold text-brand-blue uppercase tracking-wider">
            Direct Quote Submission
          </span>
          <h3 className="mt-2 font-serif text-2xl sm:text-3xl tracking-[-0.01em] text-ink">
            Submit Your Quote
          </h3>
          <p className="mt-1 text-sm text-muted">
            We will review your configured requirements and contact you within 24 hours.
          </p>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          /* Success Confirmation View */
          <div className="p-6 sm:p-8 text-center my-auto">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="mt-4 font-serif text-3xl tracking-tight text-ink">
              Quote Submitted!
            </h3>
            <p className="mt-2 text-lg font-semibold text-brand-blue">
              We will contact you shortly.
            </p>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Thank you, <strong className="text-ink">{name}</strong>. Your project requirements and configured quote have been delivered directly to our team.
            </p>
            <div className="mt-6 rounded-2xl bg-sunken p-4 text-left text-xs space-y-2.5 text-muted border border-line">
              <div className="flex justify-between">
                <span className="font-semibold text-ink">Setup Estimate:</span>
                <span className="tabular-nums font-bold text-ink">{formatCurrency(quote.setup.total, quote.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-ink">Contact Email:</span>
                <span className="text-ink">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-ink">Phone / WhatsApp:</span>
                <span className="text-ink">{phone}</span>
              </div>
              <div className="pt-2 border-t border-line/60 flex items-center justify-between gap-2">
                <span className="font-semibold text-ink">Quote Link</span>
                <button
                  type="button"
                  onClick={copyQuoteLink}
                  className="text-brand-blue hover:underline flex items-center gap-1 cursor-pointer font-medium text-xs"
                >
                  {copiedLink ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copiedLink ? "Copied" : "Copy Link"}
                </button>
              </div>
            </div>

            {/* Direct Connect Options (Dynamic from Admin Panel) */}
            {channels?.whatsapp || channels?.email || channels?.phone ? (
              <div className="mt-5 rounded-2xl border border-line bg-sunken/60 p-4 text-left">
                <p className="text-[11px] font-semibold text-ink uppercase tracking-wider">
                  Want an immediate response?
                </p>
                <p className="mt-1 text-xs text-muted">
                  You can also reach our engineering team directly:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {channels.whatsapp ? (
                    <a
                      href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi, I just submitted my quote requirements for ${formatCurrency(quote.setup.total, quote.currency)}: ${shareUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("secondary", "flex-1 py-2 px-3 text-xs inline-flex items-center justify-center gap-1.5 font-medium")}
                    >
                      <MessageCircle className="size-3.5 text-emerald-600 shrink-0" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  ) : null}
                  {channels.phone ? (
                    <a
                      href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                      className={buttonClass("secondary", "flex-1 py-2 px-3 text-xs inline-flex items-center justify-center gap-1.5 font-medium")}
                    >
                      <Phone className="size-3.5 text-muted shrink-0" />
                      <span>Call {channels.phone}</span>
                    </a>
                  ) : null}
                  {channels.email ? (
                    <a
                      href={`mailto:${channels.email}?subject=${encodeURIComponent("Submitted Quote: Dariyo Clone Setup")}&body=${encodeURIComponent(`Hi,\n\nI just submitted my quote configuration:\n${shareUrl}\n\nEstimated Setup: ${formatCurrency(quote.setup.total, quote.currency)}`)}`}
                      className={buttonClass("secondary", "flex-1 py-2 px-3 text-xs inline-flex items-center justify-center gap-1.5 font-medium")}
                    >
                      <Mail className="size-3.5 text-muted shrink-0" />
                      <span>Email Us</span>
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={closeModal}
              className={buttonClass("primary", "mt-6 w-full py-3 text-sm font-semibold")}
            >
              Done
            </button>
          </div>
        ) : (
          /* Submission Form Container (div instead of nested form) */
          <div className="flex flex-col overflow-hidden flex-1">
            <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-7 space-y-4">
              {/* Quote Summary Overview */}
              <div className="rounded-2xl border border-line bg-sunken p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Estimated Setup</p>
                    <p className="text-2xl font-bold text-ink tabular-nums">{formatCurrency(quote.setup.total, quote.currency)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Timeline</p>
                    <p className="text-sm font-semibold text-ink">about {weeks(quote.launchWeeks)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-card px-3 py-2 text-xs border border-line">
                  <div className="flex items-center gap-2 min-w-0">
                    <Link2 className="size-3.5 text-brand-blue shrink-0" />
                    <span className="truncate text-muted text-xs">Configured Quote Link</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyQuoteLink}
                    className="text-brand-blue hover:underline flex items-center gap-1 cursor-pointer shrink-0 font-medium text-xs ml-2"
                  >
                    {copiedLink ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    {copiedLink ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
                  {error}
                </div>
              ) : null}

              {/* Name and Email */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Vijay Sharma"
                    className="mt-1.5 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-hidden focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="vijay@example.com"
                    className="mt-1.5 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-hidden focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="+91 98765 43210"
                    className="mt-1.5 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-hidden focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Acme Corp"
                    className="mt-1.5 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-hidden focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {/* Requirements & Project Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Your Requirements & Notes
                </label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Tell us about your requirements (e.g. mobile app, custom features, Node.js/FastAPI backend, dedicated developer talent, or target launch date)..."
                  className="mt-1.5 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-hidden focus:border-brand-blue focus:ring-1 focus:ring-brand-blue resize-none"
                />
              </div>
            </div>

            {/* Pinned Action Footer */}
            <div className="border-t border-line/70 bg-sunken/40 px-6 py-4 sm:px-7">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className={buttonClass("blue", "w-full py-3.5 text-sm font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2")}
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Submitting Quote...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4 shrink-0" />
                    <span>Submit Quote & Requirements</span>
                  </>
                )}
              </button>
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
                <span>No upfront payment required · We will contact you</span>
                <div className="flex items-center gap-3 ml-auto">
                  {channels?.phone ? (
                    <a
                      href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                      className="text-ink hover:text-brand-blue inline-flex items-center gap-1 font-medium"
                    >
                      <Phone className="size-3 text-muted" />
                      <span>{channels.phone}</span>
                    </a>
                  ) : null}
                  {channels?.whatsapp ? (
                    <a
                      href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi, I'm reviewing the quote for ${formatCurrency(quote.setup.total, quote.currency)}: ${shareUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <MessageCircle className="size-3 text-emerald-600" />
                      <span>WhatsApp us</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Primary Quote Conversion Box */}
      <div className="rounded-2xl border border-brand-blue/30 bg-brand-blue/[0.04] p-3 text-center transition-all hover:border-brand-blue/40">
        <button
          type="button"
          onClick={openModal}
          className={buttonClass("blue", "w-full py-3 px-4 text-sm font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer")}
        >
          <Send aria-hidden className="size-4 shrink-0" />
          <span>Submit Your Quote</span>
        </button>
        <p className="mt-2 text-[11px] text-muted flex items-center justify-center gap-1.5 font-medium">
          <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span>We will review your requirements & contact you</span>
        </p>
      </div>

      {/* Portal modal to document.body so it is never inside any parent form */}
      {mounted && typeof document !== "undefined" ? createPortal(modalContent, document.body) : null}
    </>
  );
}
