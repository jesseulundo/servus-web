import { getFormatter } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getLegal, legalStatus, type LegalBlock, type LegalDoc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Notice } from "@/components/ui/Notice";

const HREF = { privacy: "/privacy", terms: "/terms" } as const;

/** Drafts stay out of search results (and the sitemap) until legal approves them. */
export function legalMetadata(doc: LegalDoc, locale: Locale) {
  const c = getLegal(doc, locale);
  return pageMetadata({ locale, href: HREF[doc], seo: { title: c.title, description: c.seoDescription }, noindex: !legalStatus[doc].approved });
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p>{block}</p>;
  if ("list" in block)
    return (
      <ul className="list-disc space-y-2 pl-6 marker:text-green">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[36rem] text-left text-base">
        <thead className="bg-mist">
          <tr>
            {block.table.head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row[0]} className="border-t border-line align-top">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={cell} scope="row" className="px-4 py-3 font-medium">
                    {cell}
                  </th>
                ) : (
                  <td key={cell} className="px-4 py-3">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function LegalPage({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  const c = getLegal(doc, locale);
  const status = legalStatus[doc];
  const format = await getFormatter({ locale });
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="text-4xl">{c.title}</h1>
      <p className="mt-3 text-sm text-ink-muted">
        {c.updatedLabel}: <time dateTime={status.updated}>{format.dateTime(new Date(status.updated), { dateStyle: "long" })}</time>
      </p>
      {!status.approved && (
        <div className="mt-8">
          <Notice tone="warning">{c.draftNotice}</Notice>
        </div>
      )}
      <p className="mt-8 text-lg leading-relaxed">{c.intro}</p>
      <div className="mt-10 space-y-10">
        {c.sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
            <h2 id={`${s.id}-h`} className="text-2xl">
              {s.heading}
            </h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed">
              {s.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
