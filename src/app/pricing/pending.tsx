"use client";

import { createContext, use, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/** True while the quote on screen is about to be replaced: a box was ticked and the server has not answered yet. */
export const QuotePending = createContext(false);

/**
 * The quote's send, copy and print buttons. While a change is in flight the
 * summary still shows the previous quote, and these would pass it on: a copied
 * link or a WhatsApp message without the module just ticked. So they are inert
 * until the new figures arrive, which takes a moment, not long enough to wait
 * on.
 */
export function QuoteActions({ children, className }: { children: ReactNode; className?: string }) {
  const pending = use(QuotePending);
  return (
    <div inert={pending} className={cn(className, "transition-opacity", pending && "opacity-50")}>
      {children}
    </div>
  );
}
