"use client";

import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  /** The value string or number to display (e.g. "4,180", "3", "0%", "30"). */
  value: string | number;
  /** Duration of count animation in milliseconds. Defaults to 1400ms. */
  duration?: number;
  /** Optional additional class names. */
  className?: string;
}

/**
 * AnimatedCounter counts up smoothly when scrolled into view.
 * Handles numbers with commas, currency prefixes, and percentage suffixes.
 * Gracefully preserves full SSR content for SEO bots and accessibility.
 */
export function AnimatedCounter({
  value,
  duration = 1400,
  className,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const rawStr = String(value);
    const element = containerRef.current;
    if (!element) return;

    // Extract prefix, number part, and suffix
    const match = rawStr.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
    if (!match) return;

    const prefix = match[1] || "";
    const numPart = match[2] || "";
    const suffix = match[3] || "";

    const parsedNumber = parseFloat(numPart.replace(/,/g, ""));
    if (isNaN(parsedNumber)) return;

    const hasComma = numPart.includes(",");
    const decimalPlaces = numPart.includes(".") ? (numPart.split(".")[1]?.length ?? 0) : 0;

    // Check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing: easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentNum = parsedNumber * easeProgress;

            let formattedNum: string;
            if (decimalPlaces > 0) {
              formattedNum = currentNum.toFixed(decimalPlaces);
            } else {
              const rounded = Math.round(currentNum);
              formattedNum = hasComma ? rounded.toLocaleString("en-US") : String(rounded);
            }

            if (element) {
              element.textContent = `${prefix}${formattedNum}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else if (element) {
              element.textContent = rawStr;
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={containerRef} className={className}>
      {value}
    </span>
  );
}
