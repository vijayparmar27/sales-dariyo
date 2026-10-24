import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";

export interface BreadcrumbCrumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  className?: string;
  showHomeIcon?: boolean;
}

/**
 * Accessible Breadcrumbs component rendering both visible semantic navigation
 * and BreadcrumbList Schema.org JSON-LD structured data.
 *
 * Guarantees 100% parity between Googlebot visible DOM and Schema.org rich snippets,
 * eliminating mismatch penalties and earning rich breadcrumb trails in Google SERP.
 */
export function Breadcrumbs({
  items,
  className = "",
  showHomeIcon = true,
}: BreadcrumbsProps) {
  const jsonLd = serializeJsonLd(buildBreadcrumbJsonLd(items));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`mb-6 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-muted ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-ink transition-colors"
              title="Home"
            >
              {showHomeIcon ? (
                <Home className="size-3.5" aria-hidden="true" />
              ) : null}
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                <ChevronRight
                  className="size-3 text-muted/60 shrink-0"
                  aria-hidden="true"
                />
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-medium text-ink truncate max-w-[240px] sm:max-w-[400px]"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-ink transition-colors truncate max-w-[180px] sm:max-w-none"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
