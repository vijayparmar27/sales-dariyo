import Image from "next/image";

import { CardamomJarSvg, CocoaTinSvg, CoffeePouchSvg } from "@/components/demo/north-nourish-assets";
import type { DemoImage, DemoProduct } from "@/data/demo-store";
import { cn } from "@/lib/cn";

/**
 * A demo product's picture: its real photo when it has one (the live store's
 * products do), otherwise the drawn artwork the fictional brand uses.
 */
export function ProductVisual({
  product,
  image,
  sizes,
  preload = false,
  className,
}: {
  product: DemoProduct;
  /** A particular photo, such as a gallery shot; defaults to the product's photo. */
  image?: DemoImage;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const shown = image ?? product.photo;
  if (shown) {
    return (
      <Image
        src={shown.src}
        alt={shown.alt}
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className={cn("h-auto w-full object-contain", className)}
      />
    );
  }
  const Art = product.art === "spices" ? CardamomJarSvg : product.art === "cocoa" ? CocoaTinSvg : CoffeePouchSvg;
  return <Art className={className} role="img" aria-label={product.name} />;
}
