"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/cn";
import { CURRENCY_LIST, type CurrencyCode } from "@/lib/i18n/currencies";
import { LANGUAGE_LIST, type LanguageCode } from "@/lib/i18n/languages";
import { useI18n } from "@/lib/i18n/context";

export function LocaleSwitcher({ className }: { className?: string }) {
  const { lang, currency, setLang, setCurrency, isPending } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLang = LANGUAGE_LIST.find((l) => l.code === lang) ?? LANGUAGE_LIST[0];
  const activeCurr = CURRENCY_LIST.find((c) => c.code === currency) ?? CURRENCY_LIST[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language and currency"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-line bg-card/80 backdrop-blur-xs px-2.5 py-1.5 text-xs font-medium text-ink shadow-2xs transition-all hover:bg-card hover:border-brand-blue/30 focus-visible:outline-2 focus-visible:outline-ring",
          isOpen && "border-brand-blue/50 ring-2 ring-brand-blue/10",
          isPending && "opacity-70 animate-pulse",
        )}
      >
        <span className="text-sm leading-none">{activeLang?.flag ?? "🌐"}</span>
        <span className="font-semibold text-ink">{activeCurr?.code}</span>
        <span className="text-muted/60 text-[10px]">·</span>
        <span className="text-muted">{activeLang?.code.toUpperCase()}</span>
        <ChevronDown className={cn("size-3 text-muted transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-2xl border border-line bg-card p-2.5 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-100"
        >
          {/* Currency Section */}
          <div className="px-2 py-1 text-[11px] font-semibold text-muted uppercase tracking-wider">
            Currency
          </div>
          <div className="grid grid-cols-1 gap-0.5">
            {CURRENCY_LIST.map((curr) => {
              const isSelected = curr.code === currency;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => {
                    setCurrency(curr.code as CurrencyCode);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition-colors",
                    isSelected
                      ? "bg-brand-blue/10 font-semibold text-brand-blue"
                      : "text-ink hover:bg-sunken",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{curr.flag}</span>
                    <span>{curr.name}</span>
                    <span className="text-muted font-normal">({curr.symbol.trim()})</span>
                  </span>
                  {isSelected && <Check className="size-3.5 text-brand-blue" />}
                </button>
              );
            })}
          </div>

          <div className="my-2 border-t border-line" />

          {/* Language Section */}
          <div className="px-2 py-1 text-[11px] font-semibold text-muted uppercase tracking-wider">
            Language
          </div>
          <div className="grid grid-cols-1 gap-0.5 max-h-48 overflow-y-auto">
            {LANGUAGE_LIST.map((l) => {
              const isSelected = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLang(l.code as LanguageCode);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition-colors",
                    isSelected
                      ? "bg-brand-blue/10 font-semibold text-brand-blue"
                      : "text-ink hover:bg-sunken",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{l.flag}</span>
                    <span>{l.nativeName}</span>
                    <span className="text-muted text-[11px]">({l.name})</span>
                  </span>
                  {isSelected && <Check className="size-3.5 text-brand-blue" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
