"use client";

import { useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SpotlightCardProps extends ComponentProps<"div"> {
  children: ReactNode;
  /** Spotlight glow color. Defaults to subtle brand blue. */
  spotlightColor?: string;
  /** Size of spotlight in pixels. Defaults to 450px. */
  spotlightSize?: number;
}

/**
 * SpotlightCard renders an interactive cursor-following flashlight effect,
 * giving cards a tangible, modern feel similar to Linear and Raycast.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(0, 84, 249, 0.1)",
  spotlightSize = 450,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Interactive spotlight reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovered && position ? 1 : 0,
          background: position
            ? `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`
            : "transparent",
        }}
      />
      {children}
    </div>
  );
}
