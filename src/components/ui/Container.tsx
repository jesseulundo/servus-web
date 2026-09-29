import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type Tone = "white" | "mist" | "navy";
const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  navy: "bg-navy text-white [&_h2]:text-white [&_h3]:text-white",
};

export function Section({
  children,
  tone = "white",
  id,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-12">
      {eyebrow && (
        <p className={`mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] ${dark ? "text-green-light" : "text-green-strong"}`}>
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={`text-3xl leading-tight sm:text-4xl ${dark ? "text-white" : ""}`}>
        {title}
      </Tag>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/80" : "text-ink-muted"}`}>{intro}</p>}
    </div>
  );
}
