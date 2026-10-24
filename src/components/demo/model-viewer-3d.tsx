"use client";

import { Box, Loader2, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

export interface ModelViewer3DProps {
  /** Path or URL to the .glb file */
  src: string;
  /** Poster image shown while loading */
  poster?: string;
  /** Accessible label */
  alt: string;
  /** Whether auto-rotation is active */
  autoRotate?: boolean;
  /** Current target angle in degrees for camera-orbit */
  rotationAngle?: number;
  /** Callback when user rotates the camera via touch or mouse */
  onAngleChange?: (angle: number) => void;
  /** Interactive hotspots */
  hotspots?: Array<{
    id: string;
    slot: string;
    position: string;
    normal: string;
    label: string;
    description: string;
  }>;
  className?: string;
}

const emptySubscribe = () => () => {};

/**
 * ModelViewer3D renders real binary glTF (.glb) 3D product models from Dariyo
 * using Google's WebGL model-viewer with PBR lighting, orbit controls, contact shadows,
 * and AR support.
 */
export function ModelViewer3D({
  src,
  poster,
  alt,
  autoRotate = false,
  rotationAngle,
  onAngleChange,
  hotspots,
  className,
}: ModelViewer3DProps) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [modelReady, setModelReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const viewerRef = useRef<HTMLElement | null>(null);

  // Load @google/model-viewer web component on client
  useEffect(() => {
    import("@google/model-viewer")
      .catch((err) => {
        console.error("Failed to load model-viewer package", err);
      });
  }, []);

  // Sync camera orbit angle when rotationAngle prop changes externally
  useEffect(() => {
    if (rotationAngle === undefined || !viewerRef.current) return;
    const el = viewerRef.current as HTMLElement & { cameraOrbit?: string };
    if (el) {
      el.cameraOrbit = `${Math.round(rotationAngle)}deg 75deg 105%`;
    }
  }, [rotationAngle]);

  // Listen to model-viewer events for load and progress
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    const handleLoad = () => {
      setModelReady(true);
      setLoadProgress(100);
    };

    const handleProgress = (event: Event) => {
      const customEvent = event as CustomEvent<{ totalProgress: number }>;
      if (customEvent.detail && typeof customEvent.detail.totalProgress === "number") {
        setLoadProgress(Math.round(customEvent.detail.totalProgress * 100));
      }
    };

    const handleCameraChange = () => {
      if (!onAngleChange || !el) return;
      const mv = el as HTMLElement & { getCameraOrbit?: () => { theta: number } };
      if (typeof mv.getCameraOrbit === "function") {
        const orbit = mv.getCameraOrbit();
        // Convert radians to degrees in 0..360
        const deg = ((orbit.theta * 180) / Math.PI) % 360;
        const normalized = deg < 0 ? deg + 360 : deg;
        onAngleChange(Math.round(normalized));
      }
    };

    el.addEventListener("load", handleLoad);
    el.addEventListener("progress", handleProgress);
    el.addEventListener("camera-change", handleCameraChange);

    return () => {
      el.removeEventListener("load", handleLoad);
      el.removeEventListener("progress", handleProgress);
      el.removeEventListener("camera-change", handleCameraChange);
    };
  }, [onAngleChange, src]);

  if (!isClient) {
    return (
      <div className={cn("relative flex size-full items-center justify-center bg-sunken/40", className)}>
        {poster ? (
          <Image
            src={poster}
            alt={alt}
            fill
            sizes="384px"
            unoptimized
            className="object-contain p-4 opacity-90"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted">
            <Box className="size-8 animate-pulse text-[#0054F9]" />
            <span className="text-xs font-medium">Loading 3D Pack…</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative flex size-full items-center justify-center overflow-hidden", className)}>
      {/* Real WebGL Model Viewer */}
      <model-viewer
        ref={viewerRef}
        src={src}
        poster={poster}
        alt={alt}
        auto-rotate={autoRotate ? "true" : undefined}
        rotation-per-second="24deg"
        camera-controls="true"
        touch-action="pan-y"
        shadow-intensity="1.5"
        shadow-softness="0.75"
        exposure="1.05"
        camera-orbit={rotationAngle !== undefined ? `${Math.round(rotationAngle)}deg 75deg 105%` : "0deg 75deg 105%"}
        field-of-view="30deg"
        min-camera-orbit="auto auto 70%"
        max-camera-orbit="auto auto 150%"
        interaction-prompt="none"
        ar="true"
        ar-modes="webxr scene-viewer quick-look"
        loading="eager"
        reveal="auto"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "360px",
          display: "block",
          outline: "none",
        }}
      >
        {/* Hotspots rendered directly in 3D coordinate space */}
        {hotspots?.map((hs) => (
          <button
            key={hs.id}
            slot={hs.slot}
            data-position={hs.position}
            data-normal={hs.normal}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(activeHotspot === hs.id ? null : hs.id);
            }}
            className="group/hs flex size-6 cursor-pointer items-center justify-center rounded-full bg-[#0054F9] text-white shadow-xl ring-4 ring-[#0054F9]/30 transition-transform hover:scale-125 focus:outline-none"
            title={hs.label}
          >
            <span className="text-[11px] font-bold">+</span>
          </button>
        ))}
      </model-viewer>

      {/* Loading Progress Bar overlay while GLB is streaming */}
      {!modelReady && (
        <div className="pointer-events-none absolute inset-x-8 bottom-6 z-20 flex flex-col items-center gap-1.5 rounded-xl border border-line/80 bg-card/90 p-2.5 shadow-lg backdrop-blur-md">
          <div className="flex w-full items-center justify-between text-[11px] font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <Loader2 className="size-3 animate-spin text-[#0054F9]" />
              <span>Streaming 3D Mesh (.glb)</span>
            </span>
            <span className="font-mono text-ink">{loadProgress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-linear-to-r from-[#0054F9] to-cyan-400 transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Floating 3D Interaction Badge */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 rounded-full border border-line/70 bg-card/85 px-3 py-1 text-[10px] font-semibold text-muted backdrop-blur-xs shadow-xs">
        <ZoomIn className="size-3 text-[#0054F9]" />
        <span>Drag to rotate · Pinch to zoom</span>
      </div>

      {/* Hotspot details tooltip popup */}
      {activeHotspot && (
        <div className="absolute top-16 inset-x-6 z-30 mx-auto max-w-xs animate-fade-in rounded-2xl border border-line bg-card/95 p-3.5 text-center shadow-xl backdrop-blur-md">
          {(() => {
            const hs = hotspots?.find((h) => h.id === activeHotspot);
            if (!hs) return null;
            return (
              <>
                <p className="text-xs font-bold text-ink">{hs.label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{hs.description}</p>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="mt-2 text-[10px] font-bold text-[#0054F9] underline hover:text-ink cursor-pointer"
                >
                  Dismiss
                </button>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
