import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent, WORK_SLUGS } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Container";
import { WorkCard } from "@/components/sections/Cards";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">) {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, href: "/work", seo: getContent(locale).work.seo });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = getContent(locale).work;
  return (
    <>
      <PageHero eyebrow={<Eyebrow>{t("nav.work")}</Eyebrow>} title={c.title} text={c.intro} />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORK_SLUGS.map((slug) => (
            <WorkCard key={slug} slug={slug} copy={c.items[slug]} locale={locale} level={2} />
          ))}
        </div>
      </Section>
      <CtaBand title={c.cta.title} text={c.cta.text} label={t("common.talkToUs")} href={{ pathname: "/contact", query: { form: "service" } }} media="ctaSimilarProject" />
    </>
  );
}
