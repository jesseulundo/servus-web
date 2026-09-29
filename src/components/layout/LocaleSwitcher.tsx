"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

/** Keeps the visitor on the equivalent page in the other language. */
export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = useTransition();

  return (
    <div role="group" aria-label={t("label")} className="flex items-center gap-1 text-sm">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              // @ts-expect-error -- params always match the current pathname
              router.replace({ pathname, params }, { locale: l }),
            )
          }
          className={`rounded-md px-2.5 py-1.5 font-mono uppercase ${l === locale ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
        >
          <span aria-hidden>{l}</span>
          <span className="sr-only">{t(l)}</span>
        </button>
      ))}
    </div>
  );
}
