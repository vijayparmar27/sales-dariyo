import type * as React from "react";

type ModelViewerCustomElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    poster?: string;
    alt?: string;
    "auto-rotate"?: boolean | string;
    "rotation-per-second"?: string;
    "camera-controls"?: boolean | string;
    "touch-action"?: string;
    "shadow-intensity"?: string | number;
    "shadow-softness"?: string | number;
    exposure?: string | number;
    "camera-orbit"?: string;
    "camera-target"?: string;
    "field-of-view"?: string;
    "min-camera-orbit"?: string;
    "max-camera-orbit"?: string;
    "interaction-prompt"?: string;
    "interaction-prompt-threshold"?: string | number;
    ar?: boolean | string;
    "ar-modes"?: string;
    loading?: "auto" | "lazy" | "eager";
    reveal?: "auto" | "interaction" | "manual";
    [key: string]: unknown;
  },
  HTMLElement
>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerCustomElementProps;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerCustomElementProps;
    }
  }
}
