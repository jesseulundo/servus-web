import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { getContent, PRODUCT_SLUGS, products, type ProductCtaTarget, type ProductSlug } from "@/content";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Container";
import { ButtonLink, ExternalButton, buttonClass, type ButtonVariant } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Notice, DraftBanner } from "@/components/ui/Notice";
import { Steps } from "@/components/ui/Steps";
import { FormRenderer } from "@/components/forms/FormRenderer";
import { JsonLd } from "@/components/ui/JsonLd";

const isProduct = (s: string): s is ProductSlug => (PRODUCT_SLUGS as readonly string[]).includes(s);
const FORM_ANCHOR = "request";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PRODUCT_SLUGS.map((slug) => ({ locale, slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[slug]">) {
  const { locale, slug } = await params;
  if (!isProduct(slug)) return {};
  return pageMetadata({
    locale: locale as Locale,
    href: { pathname: "/products/[slug]", params: { slug } },
    seo: getContent(locale as Locale).products.items[slug].seo,
    noindex: products[slug].publication === "draft",
  });
}

function Cta({ target, label, variant, embedded }: { target: ProductCtaTarget; label: string; variant: ButtonVariant; embedded: boolean }) {
  if (target.kind === "external") {
    return target.url ? (
      <ExternalButton href={target.url} variant={variant}>
        {label}
      </ExternalButton>
    ) : null;
  }
  if (embedded) {
    return (
      <a href={`#${FORM_ANCHOR}`} className={buttonClass(variant)}>
        {label}
      </a>
    );
  }
  return (
    <ButtonLink href={{ pathname: "/contact", query: { form: target.form } }} variant={variant}>
      {label}
    </ButtonLink>
  );
}

export default async function ProductPage({ params }: PageProps<"/[locale]/products/[slug]">) {
  const { locale: l, slug } = await params;
  if (!isProduct(slug)) notFound();
  const locale = l as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const p = getContent(locale).products.items[slug];
  const meta = products[slug];

  // The primary form (if any) is embedded on the page so the visitor never leaves it.
  const embeddedForm = meta.primary.kind === "form" ? meta.primary.form : null;
  const primaryMissing = meta.primary.kind === "external" && !meta.primary.url;

  return (
    <>
      {meta.publication === "draft" && <DraftBanner text={t("common.draftNotice")} />}
      {meta.status === "production" && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: p.name,
            description: p.description,
            applicationCategory: "WebApplication",
            url: absoluteUrl(locale, { pathname: "/products/[slug]", params: { slug } }),
            publisher: { "@type": "Organization", name: siteConfig.name },
          }}
        />
      )}

      <PageHero
        pattern={false}
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label={t("a11y.breadcrumb")}>
              <Eyebrow>
                <Link href="/products" className="hover:underline">{t("nav.products")}</Link> / {p.name}
              </Eyebrow>
            </nav>
            <StatusBadge status={meta.status} onDark />
          </div>
        }
        title={p.heroTitle}
        text={p.description}
        actions={
          <>
            {primaryMissing ? (
              <span className="inline-flex min-h-12 items-center rounded-lg border border-dashed border-white/30 px-5 font-medium text-white/80">
                {t("common.urlPending")}
              </span>
            ) : (
              <Cta target={meta.primary} label={p.primaryLabel} variant="primaryOnDark" embedded={!!embeddedForm} />
            )}
            {meta.secondary && p.secondaryLabel && (
              <Cta target={meta.secondary} label={p.secondaryLabel} variant="secondaryOnDark" embedded={false} />
            )}
          </>
        }
      >
        <p className="mt-8 font-mono text-xs text-white/60">{t("common.servusProduct")}</p>
      </PageHero>
      <div aria-hidden className="h-1.5" style={{ backgroundColor: meta.accent }} />

      {meta.status === "development" && (
        <div className="mx-auto max-w-site px-4 py-10 sm:px-6 lg:px-8">
          <Notice tone="warning">{t("common.developmentNotice")}</Notice>
        </div>
      )}

      {p.sections.length > 0 && (
        <Section>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.sections.map((s) => (
              <div key={s.title} className="rounded-2xl bg-mist p-6">
                <h2 className="text-xl">{s.title}</h2>
                {s.text && <p className="mt-3 leading-relaxed text-ink-muted">{s.text}</p>}
                {s.items && (
                  <ul className="mt-3 space-y-2">
                    {s.items.map((i) => (
                      <li key={i} className="flex gap-2.5 text-ink">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-green-strong" />
                        {i}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {p.flow && (
        <Section tone="mist" labelledBy="flow">
          <SectionHeading id="flow" title={p.flow.title} />
          <Steps steps={p.flow.steps} />
        </Section>
      )}

      {p.notice && (
        <Section className="!py-12">
          <div className="max-w-3xl">
            <Notice title={p.notice.title} tone={slug === "moambeira" ? "warning" : "info"}>
              {p.notice.text}
            </Notice>
          </div>
        </Section>
      )}

      {embeddedForm && (
        <Section tone="mist" id={FORM_ANCHOR} labelledBy="request-title">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <SectionHeading id="request-title" title={p.primaryLabel} intro={t(`forms.intros.${embeddedForm}`)} />
            <FormRenderer type={embeddedForm} headingId="request-title" />
          </div>
        </Section>
      )}
    </>
  );
}
