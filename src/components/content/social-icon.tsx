import { Facebook, Github, Globe, Instagram, Linkedin, Twitter, Youtube, type LucideIcon } from "lucide-react";

import type { SocialPlatform } from "@/lib/site-types";

export const SOCIALS: Record<SocialPlatform, { label: string; icon: LucideIcon }> = {
  linkedin: { label: "LinkedIn", icon: Linkedin },
  x: { label: "X", icon: Twitter },
  instagram: { label: "Instagram", icon: Instagram },
  facebook: { label: "Facebook", icon: Facebook },
  youtube: { label: "YouTube", icon: Youtube },
  github: { label: "GitHub", icon: Github },
  website: { label: "Website", icon: Globe },
};

export function socialOf(platform: string) {
  return SOCIALS[platform as SocialPlatform] ?? SOCIALS.website;
}
