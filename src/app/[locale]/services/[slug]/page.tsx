import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { getContent, SERVICE_SLUGS, services, type ServiceSlug } from "@/content";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Steps } from "@/components/ui/Steps";
import { Faq } from "@/components/ui/Faq";
import { ProductCard, WorkCard } from "@/components/sections/Cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Link } from "@/i18n/navigation";
import { serviceMedia } from "@/content/media";

const isService = (s: string): s is ServiceSlug => (SERVICE_SLUGS as readonly string[]).includes(s);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SERVICE_SLUGS.map((slug) => ({ locale, slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  if (!isService(slug)) return {};
  return pageMetadata({
    locale: locale as Locale,
    href: { pathname: "/services/[slug]", params: { slug } },
    seo: getContent(locale as Locale).services.items[slug].seo,
  });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale: l, slug } = await params;
  if (!isService(slug)) notFound();
  const locale = l as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = getContent(locale);
  const s = c.services.items[slug];
  const meta = services[slug];
  const contactHref = { pathname: "/contact", query: { form: "service" } } as const;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.seo.description,
          provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          url: absoluteUrl(locale, { pathname: "/services/[slug]", params: { slug } }),
        }}
      />
      <PageHero
        eyebrow={
          <nav aria-label={t("a11y.breadcrumb")}>
            <Eyebrow>
              <Link href="/services" className="hover:underline">{t("nav.services")}</Link>
            </Eyebrow>
          </nav>
        }
        title={s.name}
        text={s.summary}
        media={serviceMedia[slug]}
        pattern={false}
        actions={
          <ButtonLink href={contactHref} variant="primaryOnDark" arrow>
            {t("common.talkToUs")}
          </ButtonLink>
        }
      />

      {/* 1. Problem & business impact */}
      <Section labelledBy="problem">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-orange-strong">{c.services.labels.problem}</p>
            <h2 id="problem" className="mt-3 text-3xl">{s.problem.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{s.problem.text}</p>
          </div>
          <ul className="space-y-3 self-center">
            {s.problem.impact.map((i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-mist p-4 text-ink">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 2. Approach + 3. Deliverables */}
      <Section tone="mist" labelledBy="approach">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="approach" className="text-3xl">{s.approach.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{s.approach.text}</p>
          </div>
          <div>
            <h3 className="text-xl">{s.deliverables.title}</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {s.deliverables.items.map((d) => (
                <li key={d} className="flex items-center gap-2.5 rounded-lg bg-white px-4 py-3 ring-1 ring-line">
                  <Check aria-hidden className="size-4 shrink-0 text-green-strong" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 4. Process & client responsibilities */}
      <Section labelledBy="process">
        <SectionHeading id="process" title={s.process.title} />
        <Steps steps={s.process.steps} />
        <div className="mt-10 rounded-2xl border border-line p-6">
          <h3 className="text-lg">{s.process.clientResponsibilities.title}</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {s.process.clientResponsibilities.items.map((i) => (
              <li key={i} className="flex gap-2.5 text-ink-muted">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-green-strong" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 5. Related work or demo */}
      {(meta.relatedWork || meta.relatedProduct) && (
        <Section tone="mist" labelledBy="related">
          <SectionHeading id="related" title={c.services.labels.related} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {meta.relatedWork && <WorkCard slug={meta.relatedWork} copy={c.work.items[meta.relatedWork]} locale={locale} />}
            {meta.relatedProduct && <ProductCard slug={meta.relatedProduct} copy={c.products.items[meta.relatedProduct]} />}
          </div>
        </Section>
      )}

      {s.faq.length > 0 && (
        <Section labelledBy="faq">
          <SectionHeading id="faq" title={c.services.labels.faq} />
          <div className="max-w-3xl">
            <Faq items={s.faq} />
          </div>
        </Section>
      )}

      {/* 6. Call to a discovery conversation */}
      <CtaBand title={s.cta.title} text={s.cta.text} label={t("common.talkToUs")} href={contactHref} />
    </>
  );
}
