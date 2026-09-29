import type { Faq as FaqItem } from "@/content/types";

/** Native <details>: keyboard accessible, works without JS, content in the DOM for search. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-white">
      {items.map((item) => (
        <details key={item.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
            {item.q}
            <span aria-hidden className="text-xl text-green-strong transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-ink-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
