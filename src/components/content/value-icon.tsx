import {
  Award,
  BarChart3,
  Code,
  Globe,
  Headset,
  Heart,
  Layers,
  Lock,
  Receipt,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { ValueIcon } from "@/lib/site-types";

/** The admin panel offers these names for a value card; a name not here draws a sparkle. */
const ICONS: Record<ValueIcon, LucideIcon> = {
  shield: ShieldCheck,
  rocket: Rocket,
  layers: Layers,
  store: Store,
  truck: Truck,
  receipt: Receipt,
  chart: BarChart3,
  users: Users,
  headset: Headset,
  code: Code,
  sparkles: Sparkles,
  lock: Lock,
  globe: Globe,
  zap: Zap,
  heart: Heart,
  award: Award,
};

export function valueIcon(name: string): LucideIcon {
  return ICONS[name as ValueIcon] ?? Sparkles;
}
