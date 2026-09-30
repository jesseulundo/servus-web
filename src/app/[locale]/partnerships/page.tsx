import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Container";
import { FormRenderer } from "@/components/forms/FormRenderer";
import { MediaImage } from "@/components/ui/MediaImage";

export async function generateMetadata({ params }: PageProps<"/[locale]/partnerships">) {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, href: "/partnerships", seo: getContent(locale).partnerships.seo });
}

export default async function PartnershipsPage({ params }: PageProps<"/[locale]/partnerships">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = getContent(locale).partnerships;

  return (
    <>
      <PageHero
        eyebrow={<Eyebrow>{t("nav.partnerships")}</Eyebrow>}
        title={c.title}
        text={c.intro}
        actions={
          <a href="#propose" className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-green-light px-5 py-3 font-semibold text-navy hover:bg-white sm:w-auto">
            {c.formTitle}
          </a>
        }
      />

      <Section labelledBy="models">
        <SectionHeading id="models" title={c.modelsTitle} />
        {/* Cards instead of a table so the comparison works fully on mobile (blueprint UX rule). */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.models.map((m, i) => (
            <li key={m.name} className={`flex flex-col rounded-2xl p-6 ring-1 ring-line ${i === 4 ? "border-t-4 border-orange" : "border-t-4 border-green"}`}>
              <h3 className="text-xl">{m.name}</h3>
              <dl className="mt-4 flex flex-1 flex-col gap-3">
                <div>
                  <dt className="text-sm font-medium text-ink-muted">{c.labels.example}</dt>
                  <dd className="mt-0.5 text-ink">{m.example}</dd>
                </div>
                <div className="mt-auto">
                  <dt className="text-sm font-medium text-ink-muted">{c.labels.nextAction}</dt>
                  <dd className="mt-0.5 font-semibold text-navy">{m.nextAction}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" id="propose" labelledBy="propose-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <SectionHeading id="propose-title" title={c.formTitle} intro={t("forms.intros.partnership")} />
            <MediaImage id="partnershipProposal" sizes="(max-width: 1024px) 100vw, 480px" className="aspect-[4/3] rounded-2xl" />
          </div>
          <FormRenderer type="partnership" headingId="propose-title" />
        </div>
      </Section>
    </>
  );
}
