"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { buttonClass } from "@/components/ui/Button";

export const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/company", key: "company" },
  { href: "/services", key: "services" },
  { href: "/products", key: "products" },
  { href: "/work", key: "work" },
  { href: "/partnerships", key: "partnerships" },
  { href: "/contact", key: "contact" },
] as const satisfies readonly { href: AppPathname; key: string }[];

function isActive(current: string, href: string) {
  return href === "/" ? current === "/" : current === href || current.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on Escape; lock background scroll while open. Links close the menu on click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    // Blueprint: header fixed only where it doesn't eat mobile screen space → sticky from md up.
    <header className="relative z-40 bg-navy text-white md:sticky md:top-0">
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" aria-label={t("a11y.homeLink")} className="shrink-0">
          <Logo onDark className="h-8 w-auto lg:h-9" />
        </Link>

        <nav aria-label={t("a11y.mainNav")} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors ${
                      active ? "text-green-light" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LocaleSwitcher />
          <Link href="/contact" className={buttonClass("primaryOnDark", "min-h-10 !w-auto px-4 py-2 text-sm")}>
            {t("nav.cta")}
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          <span className="sr-only">{open ? t("a11y.closeMenu") : t("a11y.openMenu")}</span>
        </button>
      </div>

      {/* Mobile menu: simple full-width panel (blueprint: "menu simples") */}
      <div id="mobile-menu" hidden={!open} className="absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-navy lg:top-20 lg:h-[calc(100dvh-5rem)] xl:hidden">
        <nav aria-label={t("a11y.mainNav")} className="px-4 pb-8 pt-2 sm:px-6">
          <ul className="divide-y divide-white/10">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block py-4 font-display text-xl font-semibold ${active ? "text-green-light" : "text-white"}`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-col gap-4">
            <Link href="/contact" onClick={() => setOpen(false)} className={buttonClass("primaryOnDark")}>
              {t("nav.cta")}
            </Link>
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
