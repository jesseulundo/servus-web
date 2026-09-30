import type { ComponentProps } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import type { MediaKey } from "@/content/media";

export function CtaBand({
  title,
  text,
  label,
  href,
  media,
}: {
  title: string;
  text: string;
  label: string;
  href: ComponentProps<typeof ButtonLink>["href"];
  /** Optional image beside the call to action (visual guide: partnership image on Serviços/Trabalhos). */
  media?: MediaKey;
}) {
  if (media) {
    return (
      <section className="bg-mist py-14 sm:py-20" data-sticky-cta-hide>
        <Container>
          <div className="grid items-center overflow-hidden rounded-3xl bg-navy text-white lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h2 className="text-2xl text-white sm:text-3xl">{title}</h2>
              <p className="mt-3 text-lg text-white/80">{text}</p>
              <div className="mt-8">
                <ButtonLink href={href} variant="primaryOnDark" arrow>
                  {label}
                </ButtonLink>
              </div>
            </div>
            <MediaImage
              id={media}
              sizes="(max-width: 1024px) 100vw, 620px"
              className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-80"
              labelPosition="top-left"
            />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-mist py-14 sm:py-16" data-sticky-cta-hide>
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl">{title}</h2>
          <p className="mt-2 text-lg text-ink-muted">{text}</p>
        </div>
        <ButtonLink href={href} arrow>
          {label}
        </ButtonLink>
      </Container>
    </section>
  );
}
