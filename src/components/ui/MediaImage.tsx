import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { media, type Media, type MediaKey } from "@/content/media";

/**
 * Responsive, cropped image from the media registry.
 * - Conceptual (AI-generated) images always carry a visible "Imagem conceptual" label.
 * - `className` sets the box (aspect ratio, rounding); the image covers it using the
 *   registry's per-image focus point.
 * - `sizes` must describe the rendered width so the browser downloads the right file.
 */
export function MediaImage({
  id,
  sizes,
  className = "aspect-[16/10]",
  preload = false,
  labelPosition = "bottom-left",
  imgClassName,
}: {
  id: MediaKey;
  sizes: string;
  className?: string;
  /** Only for the above-the-fold hero (LCP image). */
  preload?: boolean;
  labelPosition?: "bottom-left" | "top-left" | "bottom-right";
  /** Responsive crop override (e.g. "object-[62%_50%] md:object-[68%_50%]"); replaces the registry focus. */
  imgClassName?: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const m: Media = media[id];
  const label =
    m.kind === "conceptual" || m.kind === "illustration" ? t(m.kind === "illustration" ? "conceptualIllustration" : "conceptualImage") : null;
  // Screen readers hear the label once, as part of the alt text; the visual badge is hidden from them.
  const alt = label && m.alt[locale] ? `${label}: ${m.alt[locale]}` : m.alt[locale];

  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      <Image
        src={m.src}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className={`object-cover ${imgClassName ?? ""}`}
        style={imgClassName ? undefined : { objectPosition: m.position }}
      />
      {label && (
        <span
          aria-hidden
          className={`absolute ${labelPosition === "top-left" ? "top-3 left-3" : labelPosition === "bottom-right" ? "bottom-3 right-3" : "bottom-3 left-3"} pointer-events-none z-10 rounded-full bg-navy/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/** Real screenshots are shown inside a simple browser frame, so they read as a real screen. */
export function BrowserFrame({
  id,
  sizes,
  preload = false,
  withCaption = false,
}: {
  id: MediaKey;
  sizes: string;
  preload?: boolean;
  withCaption?: boolean;
}) {
  const locale = useLocale() as Locale;
  const m: Media = media[id];
  const caption = withCaption ? m.caption?.[locale] : undefined;

  const frame = (
    <div className="overflow-hidden rounded-xl bg-[#0d1b24] shadow-2xl shadow-navy/30 ring-1 ring-white/10">
      <div aria-hidden className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
      </div>
      <Image src={m.src} alt={m.alt[locale]} sizes={sizes} placeholder="blur" preload={preload} className="h-auto w-full" />
    </div>
  );

  if (!caption) return frame;
  return (
    <figure>
      {frame}
      <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">{caption}</figcaption>
    </figure>
  );
}
