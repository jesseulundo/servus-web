"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/Button";

/**
 * Mobile-only floating contact button (blueprint: "mantém um botão fixo de contacto
 * apenas quando não bloquear o conteúdo"). Hidden while any element marked
 * [data-sticky-cta-hide] — heroes with their own CTA, forms, footer — is on screen.
 */
export function StickyContact() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-sticky-cta-hide]");
    const onScreen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      }
      setVisible(onScreen.size === 0);
    });
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]); // re-scan after client-side navigation

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <Link href="/contact" tabIndex={visible ? 0 : -1} className={buttonClass("primary", "shadow-lg shadow-navy/20")}>
        {t("cta")}
      </Link>
    </div>
  );
}
