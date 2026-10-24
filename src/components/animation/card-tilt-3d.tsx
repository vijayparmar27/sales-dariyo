"use client";

import { useRef, useState, useSyncExternalStore, type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface CardTilt3DProps extends ComponentProps<"div"> {
  children: ReactNode;
  /** Maximum tilt angle in degrees. Defaults to 8. */
  maxTilt?: number;
  /** Perspective distance in pixels. Defaults to 1000. */
  perspective?: number;
  /** Whether to render dynamic light glare reflection. Defaults to true. */
  glare?: boolean;
  /** Maximum glare opacity. Defaults to 0.35. */
  glareOpacity?: number;
  /** Whether to render dynamic glowing border following cursor angle. Defaults to true. */
  borderGlow?: boolean;
  /** Subtle hover scale. Defaults to 1.015. */
  scale?: number;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * CardTilt3D provides a physics-damped 3D perspective tilt on cursor hover
 * with dynamic specular glare reflection, moving border glow, and deep z-plane parallax.
 */
export function CardTilt3D({
  children,
  className,
  maxTilt = 8,
  perspective = 1000,
  glare = true,
  glareOpacity = 0.35,
  borderGlow = true,
  scale = 1.015,
  style,
  ...props
}: CardTilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ rx: number; ry: number; gx: number; gy: number; active: boolean }>({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
    active: false,
  });
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rx = (y - 0.5) * -maxTilt * 2;
    const ry = (x - 0.5) * maxTilt * 2;

    setCoords({
      rx,
      ry,
      gx: Math.round(x * 100),
      gy: Math.round(y * 100),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({
      ...prev,
      rx: 0,
      ry: 0,
      active: false,
    }));
  };

  const transformStyle = prefersReducedMotion
    ? undefined
    : {
        transform: coords.active
          ? `perspective(${perspective}px) rotateX(${coords.rx.toFixed(2)}deg) rotateY(${coords.ry.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: coords.active
          ? "transform 0.15s cubic-bezier(0.2, 0.8, 0.4, 1)"
          : "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("preserve-3d relative", className)}
      style={{
        ...transformStyle,
        ...style,
      }}
      {...props}
    >
      {/* Dynamic 3D border glow that follows the cursor */}
      {borderGlow && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[1px] z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: coords.active ? 0.85 : 0,
            background: `radial-gradient(350px circle at ${coords.gx}% ${coords.gy}%, rgba(0, 84, 249, 0.4), transparent 60%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}

      {/* Dynamic specular light reflection */}
      {glare && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: coords.active ? glareOpacity : 0,
            background: `radial-gradient(circle at ${coords.gx}% ${coords.gy}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.15) 30%, transparent 65%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
