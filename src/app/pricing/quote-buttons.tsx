"use client";

import { Check, Link2, Printer } from "lucide-react";
import { useState } from "react";

import { buttonClass } from "@/components/ui";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access needs a secure context and a permission some
      // browsers withhold; the prompt still lets the buyer copy it by hand.
      window.prompt("Copy this link", url);
    }
  }

  return (
    <button type="button" onClick={copy} className={buttonClass("secondary", "w-full px-3")}>
      {copied ? <Check aria-hidden className="size-4" /> : <Link2 aria-hidden className="size-4" />}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={buttonClass("secondary", "w-full px-3")}
    >
      <Printer aria-hidden className="size-4" />
      Print or PDF
    </button>
  );
}
