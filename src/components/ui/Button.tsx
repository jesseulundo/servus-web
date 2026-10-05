import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type ButtonVariant = "primary" | "secondary" | "primaryOnDark" | "secondaryOnDark";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-semibold transition-colors duration-150 w-full sm:w-auto text-center";
const variants: Record<ButtonVariant, string> = {
  primary: "bg-green-strong text-white hover:bg-green-deep",
  secondary: "border border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-mist",
  primaryOnDark: "bg-green-light text-navy hover:bg-white",
  secondaryOnDark: "border border-white/30 text-white hover:border-white/60 hover:bg-white/5",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

type LinkHref = ComponentProps<typeof Link>["href"];

export function ButtonLink({
  href,
  variant = "primary",
  children,
  arrow = false,
  className = "",
}: {
  href: LinkHref;
  variant?: ButtonVariant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" />}
    </Link>
  );
}

export function ExternalButton({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
      {children}
      <ExternalLink aria-hidden className="size-4" />
    </a>
  );
}

export function TextLink({ href, children, className = "" }: { href: LinkHref; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 font-semibold text-green-strong underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}
