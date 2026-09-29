import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Container";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[locale]/company">) {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, href: "/company", seo: getContent(locale).company.seo });
}

export default async function CompanyPage({ params }: PageProps<"/[locale]/company">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = getContent(locale).company;

  return (
    <>
      <PageHero eyebrow={<Eyebrow>{t("nav.company")}</Eyebrow>} title={c.title} text={c.intro} />

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {c.blocks.map((b) => (
            <div key={b.title}>
              <h2 className="text-xl">{b.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <dl className="grid gap-5 md:grid-cols-3">
          {[c.mission, c.vision, c.promise].map((b) => (
            <div key={b.title} className="rounded-2xl bg-white p-6 ring-1 ring-line">
              <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-green-strong">{b.title}</dt>
              <dd className="mt-3 text-lg leading-relaxed text-navy">{b.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section labelledBy="pillars">
        <SectionHeading id="pillars" title={c.pillarsTitle} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {c.pillars.map((p, i) => (
            <li key={p.title} className="border-t-2 border-green pt-4">
              <span className="font-mono text-sm text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 text-lg">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="navy" labelledBy="markets">
        <SectionHeading id="markets" dark title={c.markets.title} intro={c.markets.text} />
        {/* TODO(direction): team section — publish founders/leads once approved (blueprint "Equipa"). */}
      </Section>

      <CtaBand title={c.cta.title} text={c.cta.text} label={t("common.talkToUs")} href="/contact" />
    </>
  );
}
