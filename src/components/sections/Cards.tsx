import { useTranslations } from "next-intl";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { products, services, work, type ProductSlug, type ServiceSlug, type WorkSlug } from "@/content/catalog";
import type { ProductCopy, ServiceCopy, WorkCopy } from "@/content/types";
import { serviceIcons } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MediaImage } from "@/components/ui/MediaImage";
import { productMedia, serviceMedia, workMedia } from "@/content/media";

// Visual guide "sizes" suggestion, per grid.
const CARD_SIZES_2COL = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px";
const CARD_SIZES_3COL = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px";

const cardBase =
  "group relative flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-line transition-[box-shadow,transform] duration-200 hover:shadow-lg hover:shadow-navy/5 focus-within:ring-2 focus-within:ring-orange";

/** Whole card is clickable via the stretched title link; no hover-only content. */
function StretchedLink({ href, children }: { href: React.ComponentProps<typeof Link>["href"]; children: React.ReactNode }) {
  return (
    <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
      {children}
    </Link>
  );
}

/** Visual guide V3: image on top, title, short description, 2–3 tags, discreet link. */
export function ServiceCard({ slug, copy }: { slug: ServiceSlug; copy: ServiceCopy }) {
  const t = useTranslations("common");
  const Icon = serviceIcons[services[slug].icon];
  return (
    <article className={`${cardBase} overflow-hidden p-0 hover:-translate-y-1 hover:ring-green/60`}>
      <div className="relative">
        <MediaImage id={serviceMedia[slug]} sizes={CARD_SIZES_3COL} className="aspect-[4/3]" labelPosition="top-left" />
        <span className="absolute -bottom-5 right-5 z-10 inline-flex size-11 items-center justify-center rounded-xl bg-white text-green-strong shadow-md ring-1 ring-line">
          <Icon aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-7">
        <h3 className="text-xl">
          <StretchedLink href={{ pathname: "/services/[slug]", params: { slug } }}>{copy.name}</StretchedLink>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{copy.summary}</p>
        <p className="mt-5 flex flex-wrap gap-1.5" aria-label={copy.deliverables.title}>
          {copy.deliverables.items.slice(0, 3).map((d) => (
            <span key={d} className="rounded-md bg-mist px-2 py-1 font-mono text-xs text-ink-muted">
              {d}
            </span>
          ))}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-strong">
          {t("learnMore")} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export function ProductCard({ slug, copy }: { slug: ProductSlug; copy: ProductCopy }) {
  const t = useTranslations("common");
  const meta = products[slug];
  return (
    <article className={`${cardBase} overflow-hidden p-0`}>
      <MediaImage id={productMedia[slug]} sizes={CARD_SIZES_2COL} className="aspect-[16/9]" />
      {/* Controlled product identity: a single accent band */}
      <div aria-hidden className="h-1.5" style={{ backgroundColor: meta.accent }} />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <StatusBadge status={meta.status} />
          <span className="font-mono text-xs text-ink-muted">{t("servusProduct")}</span>
        </div>
        <h3 className="text-2xl">
          <StretchedLink href={{ pathname: "/products/[slug]", params: { slug } }}>{copy.name}</StretchedLink>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{copy.valueProp}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-green-strong">
          {t("learnMore")} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

const countryNames: Record<string, Record<"JP" | "AO", string>> = {
  pt: { JP: "Japão", AO: "Angola" },
  en: { JP: "Japan", AO: "Angola" },
};

export function WorkCard({ slug, copy, locale }: { slug: WorkSlug; copy: WorkCopy; locale: string }) {
  const t = useTranslations("common");
  const meta = work[slug];
  return (
    <article className={`${cardBase} overflow-hidden p-0`}>
      <MediaImage id={workMedia[slug]} sizes={CARD_SIZES_3COL} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusBadge status="partner" />
          {meta.country && (
            <span className="inline-flex items-center gap-1 text-sm text-ink-muted">
              <MapPin aria-hidden className="size-3.5" />
              {countryNames[locale]?.[meta.country] ?? meta.country}
            </span>
          )}
        </div>
        <h3 className="text-xl">
          <StretchedLink href={{ pathname: "/work/[slug]", params: { slug } }}>{copy.partner}</StretchedLink>
        </h3>
        <p className="mt-2 text-ink">{copy.context}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{copy.responsibility}</p>
        {copy.scope && <ScopeChips items={copy.scope} label={t("scope")} className="mt-4" />}
        <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-green-strong">
          {t("learnMore")} <ArrowRight aria-hidden className="size-4" />
        </span>
      </div>
    </article>
  );
}

export function ScopeChips({ items, label, className = "", onDark = false }: { items: string[]; label: string; className?: string; onDark?: boolean }) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((i) => (
        <li
          key={i}
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${onDark ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-green-light/40 text-navy"}`}
        >
          {i}
        </li>
      ))}
    </ul>
  );
}
