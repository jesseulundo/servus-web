import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Mail } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { isFormType, type FormType } from "@/lib/forms/definitions";
import { PageHero, Eyebrow } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { FormRenderer } from "@/components/forms/FormRenderer";

/** Forms offered in the picker. "interest" is reachable only from the MOAMBEIRA page. */
const PICKER: FormType[] = ["service", "partnership", "demo", "general", "support"];

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, href: "/contact", seo: getContent(locale).contact.seo });
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const requested = (await searchParams).form;
  const active: FormType = isFormType(requested) ? requested : "service";
  const t = await getTranslations({ locale });
  const c = getContent(locale).contact;

  return (
    <>
      <PageHero pattern={false} eyebrow={<Eyebrow>{t("nav.contact")}</Eyebrow>} title={c.title} text={c.intro} />
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <nav aria-label={t("forms.chooseType")} className="mb-6">
              <ul className="flex flex-wrap gap-2">
                {PICKER.map((type) => (
                  <li key={type}>
                    <Link
                      href={{ pathname: "/contact", query: { form: type } }}
                      scroll={false}
                      aria-current={type === active ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium ring-1 transition-colors ${
                        type === active ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-line hover:ring-navy/40"
                      }`}
                    >
                      {t(`forms.types.${type}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <h2 id="form-title" className="text-2xl">{t(`forms.types.${active}`)}</h2>
            <p className="mb-6 mt-2 text-ink-muted">{t(`forms.intros.${active}`)}</p>
            {/* key forces a fresh form (and timers) when switching type */}
            <FormRenderer key={active} type={active} headingId="form-title" />
          </div>

          <aside className="space-y-8 lg:pt-16">
            <div className="rounded-2xl bg-mist p-6">
              <h2 className="text-lg">{c.directTitle}</h2>
              <p className="mt-2 text-ink-muted">{c.directText}</p>
              <a href={`mailto:${siteConfig.email}`} className="mt-1 inline-flex items-center gap-2 font-semibold text-green-strong underline-offset-4 hover:underline">
                <Mail aria-hidden className="size-4" />
                {siteConfig.email}
              </a>
            </div>
            <ul className="space-y-3">
              {c.practices.map((p) => (
                <li key={p} className="flex gap-3 text-ink">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-green-strong" />
                  {p}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
