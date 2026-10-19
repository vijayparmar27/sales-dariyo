import Image from "next/image";

import { cn } from "@/lib/cn";
import type { SiteImageSource } from "@/lib/site-types";

/**
 * A picture uploaded through the admin panel, filling its parent (which sets
 * the size and the corners). Optimised by Next when its host is one the site
 * is configured for, and shown as it is otherwise — see `imageOf`.
 */
export function SiteImage({
  image,
  alt,
  sizes,
  className,
  preload,
}: {
  image: SiteImageSource;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={!image.optimise}
      preload={preload}
      className={cn("object-cover", className)}
    />
  );
}
