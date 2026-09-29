import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent, PRODUCT_SLUGS, products } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Container";
import { ProductCard } from "@/components/sections/Cards";
import { Notice } from "@/components/ui/Notice";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">) {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, href: "/products", seo: getContent(locale).products.seo });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = getContent(locale).products;
  const live = PRODUCT_SLUGS.filter((s) => products[s].status === "production");
  const dev = PRODUCT_SLUGS.filter((s) => products[s].status === "development");

  return (
    <>
      <PageHero eyebrow={<Eyebrow>{t("nav.products")}</Eyebrow>} title={c.title} text={c.intro} />
      <Section labelledBy="live">
        <SectionHeading id="live" title={t("common.status.production")} />
        <div className="grid gap-5 sm:grid-cols-2">
          {live.map((slug) => (
            <ProductCard key={slug} slug={slug} copy={c.items[slug]} />
          ))}
        </div>
      </Section>
      <Section tone="mist" labelledBy="dev">
        <SectionHeading id="dev" title={t("common.status.development")} />
        <div className="mb-6">
          <Notice>{t("common.developmentNotice")}</Notice>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {dev.map((slug) => (
            <ProductCard key={slug} slug={slug} copy={c.items[slug]} />
          ))}
        </div>
      </Section>
    </>
  );
}
