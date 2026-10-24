"use client";

import { useEffect } from "react";

/**
 * ScrollObserver initializes a high-performance IntersectionObserver
 * to drive scroll-triggered entrance animations across all modern browsers.
 *
 * It adds `has-reveal-js` to `document.documentElement` to signal that client-side
 * animation is active (preventing any flash of hidden content during SSR / no-JS).
 * As `.reveal` and related elements enter the viewport, it marks them with `is-revealed`.
 */
export function ScrollObserver() {
  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    const docEl = document.documentElement;
    docEl.classList.add("has-reveal-js");

    const SELECTOR = ".reveal, .reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            // Stop observing once revealed to free resources
            observer.unobserve(entry.target);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      },
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(SELECTOR);
      elements.forEach((el) => {
        if (!el.classList.contains("is-revealed")) {
          observer.observe(el);
        }
      });
    };

    // Initial observation
    observeAll();

    // Use MutationObserver so dynamically added content (tab changes, router navigations) gets animated
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
