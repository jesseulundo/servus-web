import type { ComponentProps } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBand({
  title,
  text,
  label,
  href,
}: {
  title: string;
  text: string;
  label: string;
  href: ComponentProps<typeof ButtonLink>["href"];
}) {
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
