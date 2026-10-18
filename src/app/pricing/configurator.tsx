"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition, type KeyboardEvent, type ReactNode } from "react";

import { buttonClass } from "@/components/ui";
import { GST } from "@/data/catalog";
import { cn } from "@/lib/cn";
import {
  matchingPackage,
  normaliseModules,
  pricingHref,
  type Selection,
} from "@/lib/selection";

import { QuotePending } from "./pending";

export interface ModuleOption {
  id: string;
  name: string;
  summary: string;
  includes: string[];
  price: string;
  required: boolean;
  note: string | null;
}

export interface GroupOption {
  id: string;
  name: string;
  blurb: string;
  modules: ModuleOption[];
}

export interface PackageOption {
  id: string;
  name: string;
  blurb: string;
  price: string;
  moduleIds: string[];
}

export interface ChoiceOption {
  id: string;
  name: string;
  price: string;
  detail: string;
  covers: string[];
}

/**
 * The buyer's side of the pricing page: boxes to tick and plans to pick.
 *
 * It holds no prices of its own. A change becomes a new URL, the server renders
 * the quote for that URL, and the summary arrives as `summary`, already worked
 * out. Meanwhile `useOptimistic` ticks the box at once, so the page answers the
 * click immediately and the figures follow a moment later, dimmed until they
 * do.
 *
 * Without JavaScript the same markup is a plain GET form with an "Update
 * price" button, which is why every input carries its name and value and the
 * required module, whose box cannot be unticked, still rides along as a hidden
 * field.
 */
export function Configurator({
  selection,
  groups,
  packages,
  plans,
  hosting,
  summary,
  totals,
}: {
  selection: Selection;
  groups: GroupOption[];
  packages: PackageOption[];
  plans: ChoiceOption[];
  hosting: ChoiceOption[];
  summary: ReactNode;
  totals: ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [current, setCurrent] = useOptimistic(selection);
  const chosen = new Set(current.moduleIds);
  const activePackage = matchingPackage(current.moduleIds);

  function apply(next: Selection) {
    startTransition(() => {
      setCurrent(next);
      router.replace(pricingHref(next), { scroll: false });
    });
  }

  function toggle(id: string, on: boolean) {
    const ids = on ? [...current.moduleIds, id] : current.moduleIds.filter((m) => m !== id);
    apply({ ...current, moduleIds: normaliseModules(ids) });
  }

  return (
    <form
      action="/pricing"
      method="get"
      onKeyDown={swallowEnterOnChoices}
      className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start print:block"
    >
      {/* The form's default button, for Enter without JavaScript: with no
          name it submits the boxes as they are, like "Update price". Without
          it the default button is the Starter package, and Enter on any box
          replaced the selection with Starter. */}
      <button type="submit" hidden tabIndex={-1} aria-hidden="true" />

      <div className="space-y-12 print:hidden">
        <section aria-labelledby="packages-title">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="packages-title" className="font-serif text-3xl tracking-[-0.01em]">
              Start from a package
            </h2>
            <p className="text-sm text-muted" aria-live="polite">
              {activePackage === null ? "Custom selection" : "Or tick modules below"}
            </p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {packages.map((pkg) => {
              const active = activePackage === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="submit"
                  name="pkg"
                  value={pkg.id}
                  aria-pressed={active}
                  onClick={(event) => {
                    event.preventDefault();
                    apply({ ...current, moduleIds: normaliseModules(pkg.moduleIds) });
                  }}
                  className={cn(
                    // flex-col: a button centres its content vertically, which
                    // left shorter cards' titles lower than their neighbours'.
                    "flex flex-col rounded-2xl border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    active
                      ? "border-[#0054F9] bg-[#EBF3FF] ring-2 ring-[#0054F9]/20"
                      : "border-line bg-card hover:border-muted/60",
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-ink flex items-center gap-2">
                      <span>{pkg.name}</span>
                      {pkg.id === "growth" ? (
                        <span className="rounded-full bg-[#0054F9] text-white px-2 py-0.5 text-[10px] font-bold shadow-2xs">
                          Popular
                        </span>
                      ) : null}
                    </span>
                    {active ? <Check aria-hidden className="size-4 text-[#0054F9]" /> : null}
                  </span>
                  <span className="mt-3 block text-2xl font-semibold tracking-tight tabular-nums">
                    {pkg.price}
                  </span>
                  <span className="block text-xs text-muted">
                    {GST.enabled ? "one-time, before GST" : "one-time"}
                  </span>
                  <span className="mt-3 block text-sm text-muted">{pkg.blurb}</span>
                </button>
              );
            })}
          </div>
        </section>

        {groups.map((group) => (
          <fieldset key={group.id}>
            <legend className="font-serif text-3xl tracking-[-0.01em]">{group.name}</legend>
            <p className="mt-1 text-sm text-muted">{group.blurb}</p>
            <div className="mt-4 grid gap-3">
              {group.modules.map((module) => {
                const on = module.required || chosen.has(module.id);
                const inputId = `module-${module.id}`;
                return (
                  <Card key={module.id} selected={on}>
                    {module.required ? <input type="hidden" name="m" value={module.id} /> : null}
                    <input
                      id={inputId}
                      type="checkbox"
                      name={module.required ? undefined : "m"}
                      value={module.id}
                      checked={on}
                      disabled={module.required}
                      readOnly={module.required}
                      onChange={
                        module.required ? undefined : (event) => toggle(module.id, event.target.checked)
                      }
                      aria-labelledby={`${inputId}-name ${inputId}-price`}
                      aria-describedby={`${inputId}-summary`}
                      className="relative z-10 mt-0.5 size-5 shrink-0 accent-[#0054F9]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <CardLabel
                          htmlFor={inputId}
                          id={`${inputId}-name`}
                          locked={module.required}
                        >
                          {module.name}
                        </CardLabel>
                        <span id={`${inputId}-price`} className="text-sm font-semibold tabular-nums">
                          {module.required ? `Included, ${module.price}` : module.price}
                        </span>
                      </div>
                      <p id={`${inputId}-summary`} className="mt-1 text-sm text-muted">
                        {module.summary}
                      </p>
                      <Ticks
                        items={module.includes}
                        className={cn(module.includes.length > 4 && "md:grid-cols-2")}
                      />
                      {module.note ? <p className="mt-3 text-xs text-muted">{module.note}</p> : null}
                    </div>
                  </Card>
                );
              })}
            </div>
          </fieldset>
        ))}

        <fieldset>
          <legend className="font-serif text-3xl tracking-[-0.01em]">Monthly support</legend>
          <p className="mt-1 text-sm text-muted">
            Updates, fixes and changes after launch. Change or stop the plan any month.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {plans.map((plan) => (
              <Choice
                key={plan.id}
                name="plan"
                option={plan}
                checked={current.planId === plan.id}
                onPick={() => apply({ ...current, planId: plan.id })}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-serif text-3xl tracking-[-0.01em]">Hosting estimate</legend>
          <p className="mt-1 text-sm text-muted">
            Servers and storage are in your name and billed to you by each provider, so this is
            not part of our price.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {hosting.map((tier) => (
              <Choice
                key={tier.id}
                name="hosting"
                option={tier}
                checked={current.hostingId === tier.id}
                onPick={() => apply({ ...current, hostingId: tier.id })}
              />
            ))}
          </div>
        </fieldset>

        <noscript>
          <button type="submit" className={buttonClass("primary")}>
            Update price
          </button>
        </noscript>
      </div>

      {/* Capped at the screen's height and scrollable on its own: the full
          quote is taller than most laptop screens, and a sticky card taller
          than the screen keeps its buttons out of reach until the very end
          of the page. */}
      <aside
        id="quote"
        className="relative scroll-mt-24 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:overscroll-contain print:static print:max-h-none print:overflow-visible"
      >
        {isPending ? (
          <span
            aria-hidden
            className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-sunken px-2.5 py-1 text-xs text-muted print:hidden"
          >
            <LoaderCircle className="size-3.5 animate-spin" />
            Updating
          </span>
        ) : null}
        <div aria-busy={isPending} className={cn("transition-opacity", isPending && "opacity-55")}>
          <QuotePending value={isPending}>{summary}</QuotePending>
        </div>
      </aside>

      <div
        id="quote-bar"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card/95 backdrop-blur lg:hidden print:hidden"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className={cn("min-w-0 transition-opacity", isPending && "opacity-55")}>{totals}</div>
          <a href="#quote" className={buttonClass("primary", "shrink-0 px-4 py-2")}>
            View quote
          </a>
        </div>
      </div>
    </form>
  );
}

/**
 * Enter on a checkbox or radio makes Chrome and Safari "click" the form's
 * first enabled submit button. With JavaScript on, that is not wanted from any
 * of them, so the key is stopped before it gets that far. Space still ticks.
 */
function swallowEnterOnChoices(event: KeyboardEvent<HTMLFormElement>) {
  const target = event.target;
  if (
    event.key === "Enter" &&
    target instanceof HTMLInputElement &&
    (target.type === "checkbox" || target.type === "radio")
  ) {
    event.preventDefault();
  }
}

/**
 * A selectable card. The whole card is clickable through its label's
 * full-size ::after, while the label text stays just the option's name; the
 * input sits above that overlay (relative z-10), so a click or a voice-control
 * "click checkbox" aimed at the box itself still lands on the box. A
 * <label> wrapping the card made every feature bullet part of the input's
 * accessible name (Core store read out nine bullets on each focus), and a
 * list inside a label is not valid HTML either.
 */
function Card({ selected, children }: { selected: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex gap-4 rounded-2xl border bg-card p-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
        selected
          ? "border-[#0054F9] ring-1 ring-[#0054F9] bg-[#EBF3FF]/20"
          : "border-line hover:border-muted/60",
      )}
    >
      {children}
    </div>
  );
}

function CardLabel({
  htmlFor,
  id,
  locked = false,
  children,
}: {
  htmlFor: string;
  id: string;
  locked?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      id={id}
      className={cn(
        "font-semibold after:absolute after:inset-0 after:rounded-2xl after:content-['']",
        locked ? "cursor-default" : "cursor-pointer",
      )}
    >
      {children}
    </label>
  );
}

function Ticks({ items, className }: { items: readonly string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("mt-3 grid gap-x-6 gap-y-1.5 text-sm", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#0054F9]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Choice({
  name,
  option,
  checked,
  onPick,
}: {
  name: string;
  option: ChoiceOption;
  checked: boolean;
  onPick: () => void;
}) {
  const inputId = `${name}-${option.id}`;
  return (
    <Card selected={checked}>
      <input
        id={inputId}
        type="radio"
        name={name}
        value={option.id}
        checked={checked}
        onChange={onPick}
        aria-labelledby={`${inputId}-name ${inputId}-price`}
        aria-describedby={`${inputId}-detail`}
        className="relative z-10 mt-1 size-4 shrink-0 accent-[#0054F9]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <CardLabel htmlFor={inputId} id={`${inputId}-name`}>
            {option.name}
          </CardLabel>
          <span id={`${inputId}-price`} className="text-sm font-semibold tabular-nums">
            {option.price}
          </span>
        </div>
        <p id={`${inputId}-detail`} className="mt-0.5 text-sm text-muted">
          {option.detail}
        </p>
        <Ticks items={option.covers} />
      </div>
    </Card>
  );
}
