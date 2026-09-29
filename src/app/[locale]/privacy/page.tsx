import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Notice } from "@/components/ui/Notice";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">) {
  const locale = (await params).locale as Locale;
  // Provisional text — kept out of search results until legal approves it.
  return pageMetadata({ locale, href: "/privacy", seo: getContent(locale).privacy.seo, noindex: true });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const c = getContent(locale).privacy;
  const [draft, ...body] = c.body;
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="text-4xl">{c.title}</h1>
      <div className="mt-8">
        <Notice tone="warning">{draft}</Notice>
      </div>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Container>
  );
}
