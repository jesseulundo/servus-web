import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="font-mono text-sm text-green-strong">404</p>
      <h1 className="mt-3 text-4xl">{t("title")}</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-muted">{t("body")}</p>
      <div className="mt-8">
        <ButtonLink href="/">{t("back")}</ButtonLink>
      </div>
    </Container>
  );
}
