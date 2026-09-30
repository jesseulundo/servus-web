import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent, SERVICE_SLUGS } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Container";
import { ServiceCard } from "@/components/sections/Cards";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, href: "/services", seo: getContent(locale).services.seo });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = getContent(locale);

  return (
    <>
      <PageHero eyebrow={<Eyebrow>{t("nav.services")}</Eyebrow>} title={c.services.title} text={c.services.intro} />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SLUGS.map((slug) => (
            <ServiceCard key={slug} slug={slug} copy={c.services.items[slug]} />
          ))}
        </div>
      </Section>
      <CtaBand title={c.home.contact.title} text={c.home.contact.text} label={t("common.talkToUs")} href={{ pathname: "/contact", query: { form: "service" } }} media="partnership" />
    </>
  );
}
