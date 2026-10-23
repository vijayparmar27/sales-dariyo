"use client";

import { CheckCircle2, Loader2, Mail, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { createPortal } from "react-dom";

import { buttonClass } from "@/components/ui";
import { useI18n } from "@/lib/i18n/context";
import type { ContactChannels } from "@/lib/site-types";

import { submitServiceInquiry } from "./actions";

interface ServiceInquiryModalProps {
  channels?: ContactChannels;
  defaultService?: string;
  defaultStack?: string;
  defaultModel?: string;
  trigger?: ReactNode;
}

export function ServiceInquiryModal({
  channels,
  defaultService = "Hire Dedicated Developers",
  defaultStack = "Node.js",
  defaultModel = "Full-Time Dedicated (160 hrs/mo)",
  trigger,
}: ServiceInquiryModalProps) {
  const { t } = useI18n();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState(defaultService);
  const [stack, setStack] = useState(defaultStack);
  const [model, setModel] = useState(defaultModel);
  const [teamScale, setTeamScale] = useState("1 Dedicated Engineer");
  const [timeline, setTimeline] = useState("Immediate (< 1 week)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");
  const [startedAt, setStartedAt] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const modalRef = useRef<HTMLDivElement>(null);

  function openModal() {
    setStartedAt(Date.now());
    setError(null);
    setIsSuccess(false);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

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

  const inquirySummary = `Hi Dariyo Engineering Team,
I would like to inquire about software engineering & staffing services:

* Service: ${service}
* Tech Stack: ${stack}
* Engagement Model: ${model}

* Name: ${name || "Not provided"}
* Company: ${company || "Not provided"}
* Phone: ${phone || "Not provided"}
* Email: ${email || "Not provided"}
${notes ? `\n* Requirements:\n${notes}` : ""}`;

  const whatsappUrl = channels?.whatsapp
    ? `https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(inquirySummary)}`
    : null;

  const emailUrl = channels?.email
    ? `mailto:${channels.email}?subject=${encodeURIComponent(`Service & Developer Staffing Inquiry: ${service} (${stack})`)}&body=${encodeURIComponent(inquirySummary)}`
    : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      setError(null);
      const res = await submitServiceInquiry({
        name,
        email,
        phone,
        company,
        service,
        stack,
        model,
        teamScale,
        timeline,
        notes,
        startedAt,
        website: websiteHoneypot,
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setError(res.message || "Could not submit inquiry at this moment.");
      }
    });
  }

  return (
    <>
      {trigger ? (
        <span onClick={openModal} className="contents cursor-pointer">
          {trigger}
        </span>
      ) : (
        <button
          type="button"
          onClick={openModal}
          className={buttonClass("primary", "px-6 py-3 text-sm font-semibold inline-flex items-center gap-2")}
        >
          <Sparkles className="size-4 text-brand-blue" />
          <span>Request Custom Quote & Staffing</span>
        </button>
      )}

      {mounted && isOpen
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              {/* Backdrop */}
              <div
                onClick={closeModal}
                className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
              />

              {/* Modal Box */}
              <div
                ref={modalRef}
                className="relative z-10 w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-card border border-line shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-line px-6 py-4.5 bg-sunken/60">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue">
                      {t.services.badge}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink">
                      {t.services.modal.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full p-2 text-muted hover:text-ink hover:bg-sunken transition-colors"
                    aria-label={t.common.close}
                  >
                    <X className="size-5" />
                  </button>
                </div>

                {isSuccess ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="size-8" />
                    </span>
                    <h4 className="font-serif text-2xl text-ink">{t.services.modal.successTitle}</h4>
                    <p className="text-sm text-muted max-w-md">
                      {t.services.modal.successSubtitle}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 pt-3">
                      {whatsappUrl ? (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonClass("primary", "bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm inline-flex items-center gap-2")}
                        >
                          <MessageCircle className="size-4" />
                          <span>{t.services.ctaWhatsApp}</span>
                        </a>
                      ) : null}

                      {emailUrl ? (
                        <a
                          href={emailUrl}
                          className={buttonClass("secondary", "px-5 py-2.5 text-sm inline-flex items-center gap-2")}
                        >
                          <Mail className="size-4 text-muted" />
                          <span>{t.contact.submitButton}</span>
                        </a>
                      ) : null}

                      {channels?.phone ? (
                        <a
                          href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                          className={buttonClass("secondary", "px-5 py-2.5 text-sm inline-flex items-center gap-2")}
                        >
                          <Phone className="size-4 text-muted" />
                          <span>{t.services.ctaCall} {channels.phone}</span>
                        </a>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-xs text-muted hover:text-ink pt-2 underline"
                    >
                      {t.services.modal.doneButton}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden flex-1">
                    {/* Anti-spam honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        value={websiteHoneypot}
                        onChange={(e) => setWebsiteHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {error ? (
                      <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                        {error}
                      </div>
                    ) : null}

                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                      {/* Service Type Selection */}
                      <div>
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                          {t.services.modal.serviceLabel}
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        >
                          <option value="Hire Dedicated Developers">{t.services.staffing}</option>
                          <option value="Website & Web Applications">{t.services.categories["website-building"]?.title || "Website & Web Applications"}</option>
                          <option value="Mobile App Development">{t.services.categories["mobile-app-building"]?.title || "Mobile App Development"}</option>
                          <option value="Custom Enterprise & APIs">{t.services.categories["custom-development"]?.title || "Custom Enterprise & APIs"}</option>
                          <option value="Code Review & Architecture Audit">{t.services.fixedProjects}</option>
                        </select>
                      </div>

                      {/* Tech Stack & Engagement Model in 2 cols */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                            {t.services.technologies}
                          </label>
                          <select
                            value={stack}
                            onChange={(e) => setStack(e.target.value)}
                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          >
                            <option value="Node.js">Node.js (Express & APIs)</option>
                            <option value="React.js">React.js (Web Apps)</option>
                            <option value="FastAPI">FastAPI (Python Microservices)</option>
                            <option value="React Native">React Native (iOS & Android)</option>
                            <option value="Next.js 16">Next.js 16 (App Router & SSR)</option>
                            <option value="Full-Stack TypeScript">Full-Stack TypeScript</option>
                            <option value="Multiple / Full Squad">Multiple Stacks / Full Squad</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                            {t.services.modal.modelLabel}
                          </label>
                          <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          >
                            <option value="Full-Time Dedicated (160 hrs/mo)">{t.services.engagement["full-time"]?.title || "Full-Time Dedicated"}</option>
                            <option value="Part-Time Retainer (80 hrs/mo)">{t.services.engagement["part-time"]?.title || "Part-Time Retainer"}</option>
                            <option value="Dedicated Engineering Pod">{t.services.engagement["squad"]?.title || "Dedicated Engineering Pod"}</option>
                          </select>
                        </div>
                      </div>

                      {/* Team Scale & Timeline */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                            Team Scale
                          </label>
                          <select
                            value={teamScale}
                            onChange={(e) => setTeamScale(e.target.value)}
                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          >
                            <option value="1 Dedicated Engineer">1 Dedicated Engineer</option>
                            <option value="2-3 Engineers Pod">2-3 Engineers Pod</option>
                            <option value="Full Cross-functional Squad">Full Cross-functional Squad</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                            Target Timeline
                          </label>
                          <select
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          >
                            <option value="Immediate (< 1 week)">Immediate (&lt; 1 week)</option>
                            <option value="Within 2-4 Weeks">Within 2-4 Weeks</option>
                            <option value="1-3 Months">1-3 Months</option>
                            <option value="Flexible / Exploring">Flexible / Exploring</option>
                          </select>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-ink mb-1">
                            {t.services.modal.nameLabel} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink mb-1">
                            {t.services.modal.emailLabel} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-ink mb-1">
                            {t.services.modal.phoneLabel}
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink mb-1">
                            {t.services.modal.companyLabel}
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Inc."
                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          {t.services.modal.notesLabel}
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Tell us what you want to build or what developer profile you are seeking..."
                          className="w-full rounded-xl border border-line bg-card px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                        />
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-line px-6 py-4 bg-sunken/40 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-muted">
                        {t.services.readyBadge}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="rounded-full px-4 py-2 text-xs font-medium text-muted hover:text-ink cursor-pointer"
                        >
                          {t.common.cancel}
                        </button>

                        <button
                          type="submit"
                          disabled={isPending}
                          className={buttonClass("primary", "px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5")}
                        >
                          {isPending ? (
                            <>
                              <Loader2 className="size-3.5 animate-spin" />
                              <span>{t.services.modal.submitting}</span>
                            </>
                          ) : (
                            <>
                              <Send className="size-3.5" />
                              <span>{t.services.modal.submitButton}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

