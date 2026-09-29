import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getContent, WORK_SLUGS, work, type WorkSlug } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DraftBanner } from "@/components/ui/Notice";
import { CtaBand } from "@/components/sections/CtaBand";

const isWork = (s: string): s is WorkSlug => (WORK_SLUGS as readonly string[]).includes(s);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => WORK_SLUGS.map((slug) => ({ locale, slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!isWork(slug)) return {};
  return pageMetadata({
    locale: locale as Locale,
    href: { pathname: "/work/[slug]", params: { slug } },
    seo: getContent(locale as Locale).work.items[slug].seo,
    noindex: work[slug].publication === "draft",
  });
}

/** Case study template — blueprint "Modelo de caso de estudo" (6 blocks). */
export default async function CaseStudyPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale: l, slug } = await params;
  if (!isWork(slug)) notFound();
  const locale = l as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const c = getContent(locale).work;
  const w = c.items[slug];
  const blocks: [string, string][] = [
    [c.labels.context, w.context],
    [c.labels.challenge, w.challenge],
    [c.labels.responsibility, w.responsibility],
    [c.labels.solution, w.solution],
    [c.labels.status, w.status],
    [c.labels.outcome, w.outcome],
  ];

  return (
    <>
      {work[slug].publication === "draft" && <DraftBanner text={t("common.draftNotice")} />}
      <PageHero
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label={t("a11y.breadcrumb")}>
              <Eyebrow>
                <Link href="/work" className="hover:underline">{t("nav.work")}</Link>
              </Eyebrow>
            </nav>
            <StatusBadge status="partner" onDark />
          </div>
        }
        title={w.partner}
        text={w.context}
      />
      <Section>
        <ol className="grid gap-5 md:grid-cols-2">
          {blocks.map(([label, text], i) => (
            <li key={label} className="rounded-2xl bg-mist p-6">
              <span className="font-mono text-sm text-green-strong">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-1 text-lg">{label}</h2>
              <p className="mt-2 leading-relaxed text-ink">{text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand title={c.cta.title} text={c.cta.text} label={t("common.talkToUs")} href={{ pathname: "/contact", query: { form: "service" } }} />
    </>
  );
}
