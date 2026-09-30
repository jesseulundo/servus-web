import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { MediaImage, BrowserFrame } from "@/components/ui/MediaImage";
import type { MediaKey } from "@/content/media";

/**
 * Blueprint Hero rule: short title, supporting text, up to two actions.
 * With `media`, the hero splits: copy on the left, image on the right half
 * (visual guide: generated images stay in half-width blocks, never full-bleed).
 */
export function PageHero({
  eyebrow,
  title,
  text,
  actions,
  pattern = true,
  large = false,
  media,
  mediaFrame = "photo",
  children,
}: {
  eyebrow?: ReactNode;
  title: string;
  text?: string;
  actions?: ReactNode;
  pattern?: boolean;
  large?: boolean;
  media?: MediaKey;
  /** "browser" wraps a real screenshot in a browser frame. */
  mediaFrame?: "photo" | "browser";
  children?: ReactNode;
}) {
  const split = Boolean(media);
  const titleSize = large
    ? split
      ? "text-4xl leading-[1.08] sm:text-5xl xl:text-[3.5rem]"
      : "text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
    : "text-3xl leading-tight sm:text-4xl lg:text-5xl";

  return (
    <section className="relative isolate overflow-hidden bg-navy text-white" data-sticky-cta-hide>
      {pattern && (
        <>
          <GeometricPattern
            className={`absolute inset-y-0 right-0 -z-10 h-full w-full md:w-3/4 ${split ? "opacity-40" : "opacity-80"}`}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/95 to-navy/40" />
        </>
      )}
      {/* Soft brand glow behind the image */}
      {split && (
        <div
          aria-hidden
          className="absolute -right-40 top-1/2 -z-10 size-[42rem] -translate-y-1/2 rounded-full bg-green/25 blur-3xl"
        />
      )}
      <Container
        className={`${large ? "py-16 sm:py-20 lg:py-28" : "py-14 sm:py-16 lg:py-20"} ${
          split ? "grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14" : ""
        }`}
      >
        <div className={split ? "" : "max-w-3xl"}>
          {eyebrow && <div className="mb-5">{eyebrow}</div>}
          <h1 className={`text-white ${titleSize}`}>{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{text}</p>}
          {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
          {children}
        </div>
        {media && (
          <div className="relative">
            {mediaFrame === "browser" ? (
              <BrowserFrame id={media} preload sizes="(max-width: 1024px) 100vw, 640px" />
            ) : (
              <MediaImage
                id={media}
                preload
                sizes="(max-width: 1024px) 100vw, 640px"
                className="aspect-[4/3] rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/10 lg:aspect-[5/4]"
              />
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-green-light">
      <span aria-hidden className="h-px w-6 bg-orange" />
      {children}
    </p>
  );
}
