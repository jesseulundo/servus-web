import { useTranslations } from "next-intl";
import type { ProductStatus } from "@/content/catalog";

const styles: Record<ProductStatus, { wrap: string; dot: string }> = {
  production: { wrap: "bg-green-light/60 text-navy", dot: "bg-green-strong" },
  development: { wrap: "bg-orange/10 text-navy", dot: "bg-orange" },
  partner: { wrap: "bg-navy/8 text-navy", dot: "bg-navy-700" },
};

/** Blueprint UX rule: product state must always be visible — as text, never color alone. */
export function StatusBadge({ status, onDark = false }: { status: ProductStatus; onDark?: boolean }) {
  const t = useTranslations("common.status");
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${onDark ? "bg-white text-navy" : s.wrap}`}>
      <span aria-hidden className={`size-2 rounded-full ${s.dot}`} />
      {t(status)}
    </span>
  );
}
