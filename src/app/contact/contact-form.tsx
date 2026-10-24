"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  Laptop,
  LoaderCircle,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Store,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/context";
import type { ContactChannels, ContactField, ContactPage } from "@/lib/site-types";
import { getVisitorClientContext } from "@/lib/visitor-client";

import { sendMessage } from "./actions";
import { IDLE } from "./contact-state";

type FormSettings = ContactPage["form"];

const LABEL = "mb-2 block text-[11px] font-medium tracking-[0.12em] text-ink/80 uppercase";
const CONTROL =
  "w-full border border-transparent bg-white text-[15px] text-ink shadow-[0_1px_2px_rgba(17,18,24,0.04)] transition-[border-color,box-shadow] outline-none placeholder:text-muted/60 focus:border-brand-blue/40 focus:shadow-[0_0_0_4px_rgba(0,84,249,0.10)] aria-invalid:border-red-400";

type TopicKey = "clone" | "staffing" | "mobileApis" | "demo" | "other";

interface ContactFormAreaProps {
  form: FormSettings;
  channels?: ContactChannels;
}

export function ContactFormArea({ form, channels }: ContactFormAreaProps) {
  // A new round re-mounts the form, which clears the action's state.
  const [round, setRound] = useState(0);
  return (
    <ContactForm
      key={round}
      form={form}
      channels={channels}
      onAnother={() => setRound((value) => value + 1)}
    />
  );
}

function ContactForm({
  form,
  channels,
  onAnother,
}: {
  form: FormSettings;
  channels?: ContactChannels;
  onAnother: () => void;
}) {
  const { t, currency } = useI18n();
  const [state, action, pending] = useActionState(sendMessage, IDLE);
  const [activeTab, setActiveTab] = useState<"form" | "whatsapp" | "call">("form");
  const [selectedTopicKey, setSelectedTopicKey] = useState<TopicKey>("clone");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [messageLength, setMessageLength] = useState<number>(0);
  const [copiedRef, setCopiedRef] = useState(false);
  const [visitorJson, setVisitorJson] = useState<string>("");

  useEffect(() => {
    void getVisitorClientContext().then((ctx) => {
      setVisitorJson(JSON.stringify(ctx));
    });
  }, []);

  // Dynamic budget tiers based on active currency
  const budgetOptions = (() => {
    switch (currency) {
      case "INR":
        return ["< ₹2.5 Lakhs", "₹2.5L - ₹8 Lakhs", "₹8 Lakhs+", t.contact.budgetConsultation];
      case "EUR":
        return ["< 2.500 €", "2.500 € - 8.000 €", "8.000 €+", t.contact.budgetConsultation];
      case "GBP":
        return ["< £2,000", "£2,000 - £7,000", "£7,000+", t.contact.budgetConsultation];
      case "AED":
        return ["< AED 10,000", "AED 10,000 - 35,000", "AED 35,000+", t.contact.budgetConsultation];
      case "USD":
      default:
        return ["< $3,000", "$3,000 - $10,000", "$10,000+", t.contact.budgetConsultation];
    }
  })();

  const timelineOptions = [
    { key: "urgent", label: t.contact.timelines.urgent },
    { key: "oneMonth", label: t.contact.timelines.oneMonth },
    { key: "threeMonths", label: t.contact.timelines.threeMonths },
    { key: "flexible", label: t.contact.timelines.flexible },
  ];

  const topicCards: { key: TopicKey; label: string; icon: typeof Store }[] = [
    { key: "clone", label: t.contact.topics.clone, icon: Store },
    { key: "staffing", label: t.contact.topics.staffing, icon: Laptop },
    { key: "mobileApis", label: t.contact.topics.mobileApis, icon: Smartphone },
    { key: "demo", label: t.contact.topics.demo, icon: Sparkles },
    { key: "other", label: t.contact.topics.other, icon: MessageCircle },
  ];

  const currentTopicLabel = customTopic || t.contact.topics[selectedTopicKey];

  const copyReferenceNumber = (refId: string) => {
    void navigator.clipboard.writeText(refId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // SUCCESS CONFIRMATION STATE
  if (state.status === "sent") {
    const reference = state.referenceId || "INQ-CONFIRMED";
    const whatsappFollowup = channels?.whatsapp
      ? `https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi ${channels.email ? "Dariyo Team" : ""}, following up on my enquiry #${reference} (${state.topic || "Project Requirement"}).`)}`
      : null;

    return (
      <div role="status" className="flex min-h-[30rem] flex-col items-center justify-center px-4 py-8 text-center animate-fade-in">
        <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 shadow-sm ring-8 ring-emerald-500/5">
          <CheckCircle2 aria-hidden className="size-9" />
        </span>

        <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
          {t.contact.referenceIdLabel}: {reference}
        </span>

        <h2 className="mt-3 font-serif text-3xl sm:text-4xl tracking-[-0.02em] text-ink">
          {form.successTitle || t.contact.thankYou}
        </h2>
        <p className="mt-2.5 max-w-md text-base leading-relaxed text-muted">
          {form.successMessage || t.contact.thankYouDesc}
        </p>

        {/* Detailed Submission Recap Card */}
        <div className="mt-6 w-full max-w-md rounded-2xl border border-line bg-white/70 p-4 text-left shadow-2xs backdrop-blur-xs space-y-2 text-xs text-muted">
          <div className="flex items-center justify-between pb-2 border-b border-line/60">
            <span className="font-semibold text-ink">{t.contact.referenceIdLabel}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-ink">{reference}</span>
              <button
                type="button"
                onClick={() => copyReferenceNumber(reference)}
                className="text-brand-blue hover:underline inline-flex items-center gap-1 text-[11px] font-medium cursor-pointer"
              >
                {copiedRef ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                <span>{copiedRef ? t.contact.copiedReference : t.contact.copyReference}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>{t.contact.topicLabel}</span>
            <span className="font-medium text-ink truncate max-w-[14rem]">{state.topic || t.contact.topics.clone}</span>
          </div>

          {state.timeline ? (
            <div className="flex items-center justify-between">
              <span>{t.contact.timelineLabel}</span>
              <span className="font-medium text-ink">{state.timeline}</span>
            </div>
          ) : null}

          {state.budget ? (
            <div className="flex items-center justify-between">
              <span>{t.contact.budgetLabel}</span>
              <span className="font-medium text-emerald-700">{state.budget}</span>
            </div>
          ) : null}

          {state.email ? (
            <div className="flex items-center justify-between pt-1">
              <span>{t.contact.emailLabel}</span>
              <span className="text-ink font-mono text-[11px]">{state.email}</span>
            </div>
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
          {whatsappFollowup ? (
            <a
              href={whatsappFollowup}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700"
            >
              <MessageCircle className="size-4" />
              <span>{t.contact.followUpWhatsApp}</span>
            </a>
          ) : null}

          <Link
            href="/pricing"
            className="flex-1 inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-line bg-white px-5 text-xs font-semibold text-ink shadow-2xs transition-colors hover:bg-sunken"
          >
            <Store className="size-3.5 text-brand-blue" />
            <span>{t.contact.explorePricing}</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={onAnother}
          className="mt-4 text-xs font-medium text-muted hover:text-ink underline transition-colors cursor-pointer"
        >
          {t.contact.sendAnother}
        </button>
      </div>
    );
  }

  const failed = state.status === "error" ? state : null;
  const valueOf = (field: ContactField) => failed?.values[field] ?? "";
  const errorOf = (field: ContactField) => failed?.fields[field];
  const shows = (field: ContactField) => field === "name" || field === "email" || field === "message" || form.fields[field].enabled;
  const requiredOf = (field: ContactField) => field === "name" || field === "email" || field === "message" || form.fields[field].required;

  const input = (field: ContactField, type: string, autoComplete: string, className?: string) =>
    shows(field) ? (
      <div className={className}>
        <label htmlFor={`contact-${field}`} className={LABEL}>
          {form.fields[field].label}
          {requiredOf(field) ? null : <span className="ml-1.5 tracking-normal text-muted normal-case">({t.common.optional})</span>}
        </label>
        <input
          id={`contact-${field}`}
          name={field}
          type={type}
          autoComplete={autoComplete}
          required={requiredOf(field)}
          placeholder={form.fields[field].placeholder}
          defaultValue={valueOf(field)}
          aria-invalid={errorOf(field) ? true : undefined}
          aria-describedby={errorOf(field) ? `contact-${field}-error` : undefined}
          className={cn(CONTROL, "h-12 rounded-full px-5")}
        />
        <FieldError field={field} message={errorOf(field)} />
      </div>
    ) : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Channel Tabs & Online Availability Bar */}
      <div className="flex flex-col gap-3 pb-2 border-b border-line/60">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 rounded-full bg-white/80 p-1 border border-line text-xs shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer",
                activeTab === "form"
                  ? "bg-brand-blue text-white shadow-xs font-semibold"
                  : "text-muted hover:text-ink"
              )}
            >
              <Send className="size-3" />
              <span>{t.contact.channelsTabForm}</span>
            </button>

            {channels?.whatsapp ? (
              <a
                href={`https://wa.me/${channels.whatsapp}?text=${encodeURIComponent(`Hi ${channels.email ? "Dariyo Team" : ""}, I'd like to discuss ${currentTopicLabel}...`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveTab("whatsapp")}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer",
                  activeTab === "whatsapp"
                    ? "bg-emerald-600 text-white shadow-xs font-semibold"
                    : "text-muted hover:text-ink"
                )}
              >
                <MessageCircle className="size-3 text-emerald-500 group-hover:text-white" />
                <span>{t.contact.channelsTabWhatsApp}</span>
              </a>
            ) : null}

            {channels?.phone ? (
              <a
                href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                onClick={() => setActiveTab("call")}
                className={cn(
                  "hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer",
                  activeTab === "call"
                    ? "bg-[#111218] text-white shadow-xs font-semibold"
                    : "text-muted hover:text-ink"
                )}
              >
                <Phone className="size-3" />
                <span>{t.contact.channelsTabCall}</span>
              </a>
            ) : null}
          </div>

          {/* Online Indicator */}
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-ink/80">{t.contact.teamOnline}</span>
            <span className="text-muted/60">·</span>
            <span className="text-[11px] text-muted">{t.contact.replyTime}</span>
          </div>
        </div>
      </div>

      <form
        key={failed?.attempt ?? "first"}
        action={action}
        className="relative grid gap-5 sm:grid-cols-2"
        onFocusCapture={(event) => {
          const started = event.currentTarget.elements.namedItem("startedAt") as HTMLInputElement | null;
          if (started && !started.value) started.value = String(Date.now());
        }}
      >
        <input type="hidden" name="startedAt" defaultValue={failed?.startedAt ?? ""} />
        <input type="hidden" name="timeline" value={selectedTimeline} />
        <input type="hidden" name="budget" value={selectedBudget} />
        <input type="hidden" name="visitor" value={visitorJson} />

        {/* Hidden Honeypot for automated spam-bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        {/* 1. DYNAMIC TOPIC & INTENT SELECTOR PILLS */}
        <div className="sm:col-span-2">
          <label className={LABEL}>
            {t.contact.topicLabel}
            {requiredOf("topic") ? null : <span className="ml-1.5 tracking-normal text-muted normal-case">({t.common.optional})</span>}
          </label>

          <div className="flex flex-wrap gap-2">
            {topicCards.map(({ key, label, icon: Icon }) => {
              const isSelected = selectedTopicKey === key && !customTopic;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedTopicKey(key);
                    setCustomTopic("");
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer border text-left",
                    isSelected
                      ? "bg-brand-blue/10 border-brand-blue text-brand-blue ring-1 ring-brand-blue/30 shadow-2xs"
                      : "bg-white/80 border-line text-ink/80 hover:border-brand-blue/30 hover:bg-white"
                  )}
                >
                  <Icon className={cn("size-3.5", isSelected ? "text-brand-blue" : "text-muted")} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Hidden or Custom Topic Input */}
          <input type="hidden" name="topic" value={currentTopicLabel} />

          {/* Dynamic Contextual Guidance Banner */}
          <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-brand-blue/20 bg-brand-blue/[0.04] p-3 text-xs text-brand-blue-deep animate-fade-in">
            <Sparkles className="size-4 shrink-0 text-brand-blue mt-0.5" />
            <div className="flex-1">
              <p className="leading-relaxed font-normal">{t.contact.hints[selectedTopicKey]}</p>
              {selectedTopicKey === "clone" ? (
                <Link
                  href="/pricing"
                  className="mt-1.5 inline-flex items-center gap-1 font-semibold text-brand-blue hover:underline text-[11px]"
                >
                  <span>{t.contact.explorePricing}</span>
                  <ExternalLink className="size-3" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {/* 2. DYNAMIC TIMELINE & BUDGET SELECTORS (OPTIONAL PROJECT SCOPE) */}
        <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2 rounded-2xl border border-line bg-white/40 p-3.5">
          {/* Target Timeline */}
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold tracking-wider text-muted uppercase">
              {t.contact.timelineLabel}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {timelineOptions.map(({ key, label }) => {
                const isSelected = selectedTimeline === label;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTimeline(isSelected ? "" : label)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer border",
                      isSelected
                        ? "bg-brand-blue text-white border-brand-blue shadow-2xs font-semibold"
                        : "bg-white border-line text-ink/80 hover:border-brand-blue/30"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estimated Budget */}
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold tracking-wider text-muted uppercase">
              {t.contact.budgetLabel} ({currency})
            </label>
            <div className="flex flex-wrap gap-1.5">
              {budgetOptions.map((opt) => {
                const isSelected = selectedBudget === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedBudget(isSelected ? "" : opt)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer border",
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs font-semibold"
                        : "bg-white border-line text-ink/80 hover:border-emerald-500/40"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. CONTACT CORE FIELDS */}
        {input("name", "text", "name")}
        {input("email", "email", "email")}
        {input("phone", "tel", "tel")}
        {input("company", "text", "organization")}

        {/* Fallback Topic Select if admin panel defined custom topics */}
        {shows("topic") && form.topics.length > 0 ? (
          <div className="sm:col-span-2">
            <label htmlFor="contact-topic-custom" className={LABEL}>
              {form.fields.topic.label} <span className="text-muted tracking-normal lowercase">({t.common.optional})</span>
            </label>
            <div className="relative">
              <select
                id="contact-topic-custom"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className={cn(CONTROL, "h-12 cursor-pointer appearance-none rounded-full pr-12 pl-5")}
              >
                <option value="">{form.fields.topic.placeholder || "Or choose a specific category..."}</option>
                {form.topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-muted" />
            </div>
          </div>
        ) : null}

        {/* 4. DYNAMIC MESSAGE AREA WITH CHARACTER COUNT */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="contact-message" className="block text-[11px] font-medium tracking-[0.12em] text-ink/80 uppercase">
              {form.fields.message.label}
            </label>
            <span className="text-[11px] tabular-nums text-muted">
              {messageLength} / 5,000
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            maxLength={5000}
            onChange={(e) => setMessageLength(e.target.value.length)}
            placeholder={t.contact.placeholders[selectedTopicKey] || form.fields.message.placeholder}
            defaultValue={valueOf("message")}
            aria-invalid={errorOf("message") ? true : undefined}
            aria-describedby={errorOf("message") ? "contact-message-error" : undefined}
            className={cn(CONTROL, "min-h-36 resize-y rounded-3xl px-5 py-4 leading-relaxed")}
          />
          <FieldError field="message" message={errorOf("message")} />
        </div>

        {failed?.message ? (
          <p role="alert" className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 sm:col-span-2 animate-shake">
            {failed.message}
          </p>
        ) : null}

        {/* 5. SUBMIT ACTION */}
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between pt-2">
          <button
            type="submit"
            disabled={pending}
            className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111218] px-7 text-[15px] font-medium text-white transition-all hover:bg-black hover:shadow-md disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
            {pending ? t.contact.sending : (form.submitLabel || t.contact.submitButton)}
            {pending ? null : (
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
          {form.note ? <p className="text-xs text-muted sm:max-w-xs sm:text-right">{form.note}</p> : null}
        </div>
      </form>
    </div>
  );
}

function FieldError({ field, message }: { field: ContactField; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={`contact-${field}-error`} className="mt-1.5 pl-5 text-xs text-red-600">
      {message}
    </p>
  );
}
