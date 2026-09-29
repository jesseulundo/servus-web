import { Compass, LayoutDashboard, Monitor, Smartphone, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import type { ServiceIcon } from "@/content/catalog";

/** Blueprint: services use consistent linear icons. */
export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  compass: Compass,
  monitor: Monitor,
  smartphone: Smartphone,
  layout: LayoutDashboard,
  sparkles: Sparkles,
  wrench: Wrench,
};
