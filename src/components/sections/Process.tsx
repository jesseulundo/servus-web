import { Braces, CircleCheck, Focus, RefreshCw, Rocket, Search, ShieldCheck, Shuffle, Target, TrendingUp, type LucideIcon } from "lucide-react";
import type { Step } from "@/content/types";

/** Visual guide V3 icon mapping (Lucide, one line weight). Order matches the content steps. */
const METHOD_ICONS: LucideIcon[] = [Search, Target, Braces, Rocket, RefreshCw];
const PRINCIPLE_ICONS: LucideIcon[] = [Focus, CircleCheck, Shuffle, ShieldCheck, TrendingUp];
/** "Confiança" is highlighted in orange in the guide. */
const PRINCIPLE_ACCENT = 3;

/**
 * "Como trabalhamos": five steps joined by a thin line on desktop, a vertical timeline on mobile.
 * Hover lifts a card by at most 4px and turns its border green.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-5">
      {/* Desktop connector through the icon centres */}
      <span aria-hidden className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-green/20 via-green/60 to-green/20 lg:block" />
      {/* Mobile vertical line */}
      <span aria-hidden className="absolute bottom-7 left-7 top-7 w-px bg-green/40 lg:hidden" />
      {steps.map((step, i) => {
        const Icon = METHOD_ICONS[i % METHOD_ICONS.length];
        return (
          <li key={step.title} className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            <span className="relative z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-green-strong shadow-sm ring-1 ring-line transition-colors duration-200 group-hover:bg-green-strong group-hover:text-white">
              <Icon aria-hidden className="size-6" strokeWidth={1.75} />
            </span>
            <div className="flex-1 rounded-xl bg-white p-5 ring-1 ring-line transition-[transform,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:shadow-md group-hover:ring-green lg:mt-5 lg:w-full">
              <span className="font-mono text-xs font-medium text-green-strong">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 text-lg">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** "Princípios": number, icon, title and one line; alternating very light green and white; gentle reveal. */
export function PrinciplesGrid({ items }: { items: Step[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((p, i) => {
        const Icon = PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length];
        const accent = i === PRINCIPLE_ACCENT;
        return (
          <li
            key={p.title}
            className={`reveal rounded-2xl p-6 ring-1 transition-transform duration-200 hover:-translate-y-1 ${
              i % 2 === 0 ? "bg-green-light/20 ring-green-light/60" : "bg-white ring-line"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`inline-flex size-11 items-center justify-center rounded-xl ${accent ? "bg-orange/10 text-orange-strong" : "bg-white text-green-strong ring-1 ring-line"}`}>
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <span className="font-mono text-sm text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 text-lg">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-muted">{p.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
