"use client";

import { Check, Link2, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { useState } from "react";

/**
 * Sharing an article: LinkedIn, X, WhatsApp or the link itself. Read from the
 * address bar when pressed, so it is right on any domain the site is served
 * from without the page knowing its own origin (which would stop it being
 * cached).
 */
export function ShareLinks({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const open = (build: (url: string) => string) => {
    window.open(build(window.location.href), "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", window.location.href);
    }
  };

  const button =
    "flex size-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-ink/20 hover:bg-sunken hover:text-ink focus-visible:outline-2 focus-visible:outline-ring";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">Share</span>
      <button
        type="button"
        aria-label="Share on LinkedIn"
        className={button}
        onClick={() => open((url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)}
      >
        <Linkedin aria-hidden className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Share on X"
        className={button}
        onClick={() =>
          open((url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)
        }
      >
        <Twitter aria-hidden className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Share on WhatsApp"
        className={button}
        onClick={() => open((url) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`)}
      >
        <MessageCircle aria-hidden className="size-4" />
      </button>
      <button type="button" aria-label={copied ? "Link copied" : "Copy the link"} className={button} onClick={copy}>
        {copied ? <Check aria-hidden className="size-4 text-brand-blue" /> : <Link2 aria-hidden className="size-4" />}
      </button>
    </div>
  );
}
