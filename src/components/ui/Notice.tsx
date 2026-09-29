import type { ReactNode } from "react";
import { Info, TriangleAlert } from "lucide-react";

export function Notice({ title, children, tone = "info" }: { title?: string; children: ReactNode; tone?: "info" | "warning" }) {
  const Icon = tone === "warning" ? TriangleAlert : Info;
  return (
    <div
      role="note"
      className={`flex gap-3 rounded-xl border p-4 sm:p-5 ${tone === "warning" ? "border-orange/40 bg-orange/5" : "border-line bg-mist"}`}
    >
      <Icon aria-hidden className={`mt-0.5 size-5 shrink-0 ${tone === "warning" ? "text-orange" : "text-green-strong"}`} />
      <div className="text-ink">
        {title && <p className="mb-1 font-semibold text-navy">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function DraftBanner({ text }: { text: string }) {
  return (
    <div className="border-b border-orange/40 bg-orange/10 px-4 py-2 text-center text-sm font-medium text-navy" role="status">
      {text}
    </div>
  );
}
