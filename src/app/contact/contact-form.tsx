"use client";

import { ArrowRight, CheckCircle2, ChevronDown, LoaderCircle } from "lucide-react";
import { useActionState, useState } from "react";

import { cn } from "@/lib/cn";
import type { ContactField, ContactPage } from "@/lib/site-types";

import { sendMessage } from "./actions";
import { IDLE } from "./contact-state";

type FormSettings = ContactPage["form"];

const LABEL = "mb-2 block text-[11px] font-medium tracking-[0.12em] text-ink/80 uppercase";
const CONTROL =
  "w-full border border-transparent bg-white text-[15px] text-ink shadow-[0_1px_2px_rgba(17,18,24,0.04)] transition-[border-color,box-shadow] outline-none placeholder:text-muted/60 focus:border-brand-blue/40 focus:shadow-[0_0_0_4px_rgba(0,84,249,0.10)] aria-invalid:border-red-400";

/**
 * The contact form, as the panel set it up: which fields show, which are
 * required, their words, and the topic menu. Works without JavaScript — it is
 * a server action — and with it, keeps what was typed when something needs
 * fixing.
 */
export function ContactFormArea({ form }: { form: FormSettings }) {
  // A new round re-mounts the form, which clears the action's state.
  const [round, setRound] = useState(0);
  return <ContactForm key={round} form={form} onAnother={() => setRound((value) => value + 1)} />;
}

function ContactForm({ form, onAnother }: { form: FormSettings; onAnother: () => void }) {
  const [state, action, pending] = useActionState(sendMessage, IDLE);

  if (state.status === "sent") {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col items-center justify-center px-4 py-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">
          <CheckCircle2 aria-hidden className="size-8" />
        </span>
        <h2 className="mt-6 font-serif text-5xl tracking-[-0.02em] text-ink">{form.successTitle || "Thank you!"}</h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{form.successMessage}</p>
        <button
          type="button"
          onClick={onAnother}
          className="mt-8 inline-flex h-11 cursor-pointer items-center rounded-full border border-line bg-white px-5 text-sm font-medium text-ink transition-colors hover:bg-white/70"
        >
          Send another message
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
          {requiredOf(field) ? null : <span className="ml-1.5 tracking-normal text-muted normal-case">(optional)</span>}
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
    <form
      key={failed?.attempt ?? "first"}
      action={action}
      className="relative grid gap-5 sm:grid-cols-2"
      onFocusCapture={(event) => {
        // When the visitor started on the form: a send within a second and a
        // half of that is a script, not a person.
        const started = event.currentTarget.elements.namedItem("startedAt") as HTMLInputElement | null;
        if (started && !started.value) started.value = String(Date.now());
      }}
    >
      <input type="hidden" name="startedAt" defaultValue={failed?.startedAt ?? ""} />
      {/* For form-filling scripts only: people never see it, and a message with it is dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {input("name", "text", "name")}
      {input("email", "email", "email")}
      {input("phone", "tel", "tel")}
      {input("company", "text", "organization")}

      {shows("topic") && form.topics.length > 0 ? (
        <div className="sm:col-span-2">
          <label htmlFor="contact-topic" className={LABEL}>
            {form.fields.topic.label}
            {requiredOf("topic") ? null : <span className="ml-1.5 tracking-normal text-muted normal-case">(optional)</span>}
          </label>
          <div className="relative">
            <select
              id="contact-topic"
              name="topic"
              required={requiredOf("topic")}
              defaultValue={valueOf("topic")}
              aria-invalid={errorOf("topic") ? true : undefined}
              className={cn(CONTROL, "h-12 cursor-pointer appearance-none rounded-full pr-12 pl-5")}
            >
              <option value="">{form.fields.topic.placeholder || "Choose a topic"}</option>
              {form.topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-muted" />
          </div>
          <FieldError field="topic" message={errorOf("topic")} />
        </div>
      ) : null}

      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={LABEL}>
          {form.fields.message.label}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder={form.fields.message.placeholder}
          defaultValue={valueOf("message")}
          aria-invalid={errorOf("message") ? true : undefined}
          aria-describedby={errorOf("message") ? "contact-message-error" : undefined}
          className={cn(CONTROL, "min-h-44 resize-y rounded-3xl px-5 py-4 leading-relaxed")}
        />
        <FieldError field="message" message={errorOf("message")} />
      </div>

      {failed?.message ? (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
          {failed.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111218] px-7 text-[15px] font-medium text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
          {form.submitLabel || "Send message"}
          {pending ? null : (
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
        {form.note ? <p className="text-xs text-muted sm:max-w-xs sm:text-right">{form.note}</p> : null}
      </div>
    </form>
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
