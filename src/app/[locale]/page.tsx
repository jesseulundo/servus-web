import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Database, Accessibility, LifeBuoy, Eye } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { getContent, PRODUCT_SLUGS, SERVICE_SLUGS, WORK_SLUGS } from "@/content";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { ProductCard, ServiceCard, WorkCard } from "@/components/sections/Cards";
import { Steps } from "@/components/ui/Steps";
import { FormRenderer } from "@/components/forms/FormRenderer";
import { JsonLd } from "@/components/ui/JsonLd";

const trustIcons = [ShieldCheck, Database, Accessibility, LifeBuoy, Eye];

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, href: "/", seo: getContent(locale).home.seo, isHome: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = getContent(locale);
  const h = c.home;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: absoluteUrl(locale, "/"),
          logo: `${siteConfig.url}/brand/servus-logo-vertical.png`,
          description: t("meta.siteDescription"),
          email: siteConfig.email,
          sameAs: Object.values(siteConfig.social).filter(Boolean),
        }}
      />

      <PageHero
        large
        media="servusHero"
        title={h.hero.title}
        text={h.hero.text}
        actions={
          <>
            <ButtonLink href="/contact" variant="primaryOnDark" arrow>
              {t("common.talkToUs")}
            </ButtonLink>
            <ButtonLink href="/work" variant="secondaryOnDark">
              {t("common.exploreWork")}
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="capabilities">
        <SectionHeading id="capabilities" eyebrow={t("nav.services")} title={h.capabilities.title} intro={h.capabilities.intro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SLUGS.map((slug) => (
            <ServiceCard key={slug} slug={slug} copy={c.services.items[slug]} />
          ))}
        </div>
      </Section>

      <Section tone="mist" labelledBy="products">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading id="products" eyebrow={t("nav.products")} title={h.products.title} intro={h.products.intro} />
          <TextLink href="/products" className="mb-12 shrink-0">{t("common.seeAll")}</TextLink>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {PRODUCT_SLUGS.map((slug) => (
            <ProductCard key={slug} slug={slug} copy={c.products.items[slug]} />
          ))}
        </div>
      </Section>

      <Section labelledBy="work">
        <SectionHeading id="work" eyebrow={t("nav.work")} title={h.work.title} intro={h.work.intro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORK_SLUGS.map((slug) => (
            <WorkCard key={slug} slug={slug} copy={c.work.items[slug]} locale={locale} />
          ))}
        </div>
      </Section>

      <Section tone="mist" labelledBy="method">
        <SectionHeading id="method" title={h.method.title} intro={h.method.intro} />
        <Steps steps={h.method.steps} />
      </Section>

      <Section tone="navy" labelledBy="trust">
        <SectionHeading id="trust" dark title={h.trust.title} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {h.trust.items.map((item, i) => {
            const Icon = trustIcons[i % trustIcons.length];
            return (
              <li key={item.title}>
                <Icon aria-hidden className="size-6 text-green-light" strokeWidth={1.75} />
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section labelledBy="contact-home">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading id="contact-home" title={h.contact.title} intro={h.contact.text} />
            <TextLink href="/partnerships">{h.contact.partnershipLink}</TextLink>
          </div>
          <FormRenderer type="service" compact headingId="contact-home" />
        </div>
      </Section>
    </>
  );
}
