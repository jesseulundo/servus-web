import type { Step } from "@/content/types";

/** Blueprint component rule: max five or six steps in one view. */
export function Steps({ steps, dark = false }: { steps: Step[]; dark?: boolean }) {
  if (process.env.NODE_ENV !== "production" && steps.length > 6) {
    console.warn(`[Steps] ${steps.length} steps — blueprint allows at most 6 per view.`);
  }
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))] lg:gap-6">
      {steps.map((step, i) => (
        <li key={step.title} className={`rounded-xl p-5 ${dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-line"}`}>
          <span className={`font-mono text-sm font-medium ${dark ? "text-green-light" : "text-green-strong"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`mt-2 text-lg ${dark ? "text-white" : ""}`}>{step.title}</h3>
          <p className={`mt-2 leading-relaxed ${dark ? "text-white/75" : "text-ink-muted"}`}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
