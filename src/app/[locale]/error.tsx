"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ButtonLink, buttonClass } from "@/components/ui/Button";

/** Friendly error page for unexpected failures inside a page (header and footer stay visible). */
export default function PageError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const t = useTranslations("errorPage");
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="font-mono text-sm text-green-strong">500</p>
      <h1 className="mt-3 text-4xl">{t("title")}</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-muted">{t("body")}</p>
      {error.digest && <p className="mt-3 font-mono text-xs text-ink-muted">{t("code", { code: error.digest })}</p>}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className={buttonClass("primary")}
        >
          {t("retry")}
        </button>
        <ButtonLink href="/" variant="secondary">
          {t("home")}
        </ButtonLink>
      </div>
    </Container>
  );
}
