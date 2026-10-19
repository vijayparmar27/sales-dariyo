import { Fragment } from "react";

import { cn } from "@/lib/cn";

/**
 * A heading typed in the admin panel, with each `*word*` set in italics — the
 * Catalis accent the rest of the site's headings carry. Everything else is
 * plain text; nothing typed in the panel reaches the page as markup.
 */
export function Accent({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/(\*[^*\n]+\*)/g).map((part, index) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <span key={index} className={cn("italic", className)}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** The same heading as plain words, for a page title or an alt text. */
export const plainHeading = (text: string): string => text.replace(/\*([^*\n]+)\*/g, "$1");
