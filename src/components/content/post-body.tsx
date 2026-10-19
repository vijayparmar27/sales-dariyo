import Link from "next/link";
import { Fragment } from "react";

import { SiteImage } from "@/components/content/site-image";
import { StarIcon } from "@/components/ui";
import { imageOf } from "@/lib/site-api";
import type { Block, Inline } from "@/lib/site-types";

/**
 * A post's body, drawn from the blocks the API parsed it into. There is no
 * HTML to trust here: every string goes through React, a link only ever
 * carries an address the API already checked, and a picture only a stored
 * upload or an https URL.
 */
function Inlines({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        switch (node.t) {
          case "text":
            return <Fragment key={index}>{node.v}</Fragment>;
          case "br":
            return <br key={index} />;
          case "code":
            return (
              <code key={index} className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[0.88em] text-ink">
                {node.v}
              </code>
            );
          case "strong":
            return (
              <strong key={index} className="font-semibold text-ink">
                <Inlines nodes={node.c} />
              </strong>
            );
          case "em":
            return (
              <em key={index}>
                <Inlines nodes={node.c} />
              </em>
            );
          case "link": {
            const className =
              "font-medium text-brand-blue underline decoration-brand-blue/30 underline-offset-4 transition-colors hover:decoration-brand-blue";
            const internal = node.href.startsWith("/") || node.href.startsWith("#");
            return internal ? (
              <Link key={index} href={node.href} className={className}>
                <Inlines nodes={node.c} />
              </Link>
            ) : (
              <a key={index} href={node.href} target="_blank" rel="noopener noreferrer" className={className}>
                <Inlines nodes={node.c} />
              </a>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6 text-[1.0625rem] leading-[1.8] text-pretty text-ink/80">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2
                key={index}
                id={block.id}
                className="mt-6 scroll-mt-28 font-serif text-[2.1rem] leading-[1.1] tracking-[-0.015em] text-balance text-ink sm:text-[2.5rem]"
              >
                <Inlines nodes={block.content} />
              </h2>
            ) : (
              <h3
                key={index}
                id={block.id}
                className="mt-3 scroll-mt-28 font-serif text-[1.65rem] leading-[1.15] tracking-[-0.01em] text-ink"
              >
                <Inlines nodes={block.content} />
              </h3>
            );
          case "paragraph":
            return (
              <p key={index}>
                <Inlines nodes={block.content} />
              </p>
            );
          case "list": {
            const items = block.items.map((item, i) => (
              <li key={i} className="pl-1.5 marker:text-brand-blue">
                <Inlines nodes={item} />
              </li>
            ));
            return block.ordered ? (
              <ol key={index} start={block.start} className="list-decimal space-y-2 pl-6 marker:font-medium">
                {items}
              </ol>
            ) : (
              <ul key={index} className="list-disc space-y-2 pl-6">
                {items}
              </ul>
            );
          }
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-2 border-l-2 border-brand-blue pl-6 font-serif text-[1.75rem] leading-[1.3] tracking-[-0.01em] text-ink italic"
              >
                <Inlines nodes={block.content} />
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={index}
                className="overflow-x-auto rounded-2xl bg-[#111218] p-5 font-mono text-[13px] leading-relaxed text-white/90"
              >
                <code>{block.text}</code>
              </pre>
            );
          case "divider":
            return (
              <div key={index} role="separator" className="flex justify-center py-2">
                <StarIcon className="size-4 text-brand-blue" />
              </div>
            );
          case "image": {
            const image = imageOf(block.src);
            if (!image) return null;
            return (
              <figure key={index} className="my-2 flex flex-col gap-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-sunken">
                  <SiteImage image={image} alt={block.alt} sizes="(min-width: 768px) 720px, 92vw" />
                </div>
                {block.caption ? (
                  <figcaption className="text-center text-sm text-muted">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
