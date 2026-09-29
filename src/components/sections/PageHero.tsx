import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";

/** Blueprint Hero rule: short title, supporting text, up to two actions. */
export function PageHero({
  eyebrow,
  title,
  text,
  actions,
  pattern = true,
  large = false,
  children,
}: {
  eyebrow?: ReactNode;
  title: string;
  text?: string;
  actions?: ReactNode;
  pattern?: boolean;
  large?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white" data-sticky-cta-hide>
      {pattern && <GeometricPattern className="absolute inset-y-0 right-0 -z-10 h-full w-full opacity-80 md:w-3/4" />}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/95 to-navy/40" />
      <Container className={large ? "py-20 sm:py-28 lg:py-36" : "py-14 sm:py-20 lg:py-24"}>
        <div className="max-w-3xl">
          {eyebrow && <div className="mb-5">{eyebrow}</div>}
          <h1 className={`text-white ${large ? "text-4xl leading-[1.08] sm:text-5xl lg:text-6xl" : "text-3xl leading-tight sm:text-4xl lg:text-5xl"}`}>
            {title}
          </h1>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{text}</p>}
          {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          {children}
        </div>
      </Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-green-light">{children}</p>;
}
