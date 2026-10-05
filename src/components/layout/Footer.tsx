import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { PRODUCT_SLUGS } from "@/content/catalog";
import { Logo } from "./Logo";

const productNames: Record<(typeof PRODUCT_SLUGS)[number], string> = {
  "trumuno-footy": "Trumuno Footy",
  "audio-cleaner": "Audio Cleaner",
  moambeira: "MOAMBEIRA",
  rh: "RH",
};

export function Footer() {
  const t = useTranslations();
  const social = Object.entries(siteConfig.social).filter(([, url]) => url);
  const linkCls = "text-white/75 hover:text-white";

  return (
    <footer className="bg-navy text-white" data-sticky-cta-hide>
      <div className="mx-auto grid w-full max-w-site gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-8">
        <div>
          <Logo onDark className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">{t("footer.tagline")}</p>
        </div>
        <nav aria-label={t("a11y.footerNav")} className="contents">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">{t("footer.company")}</h2>
            <ul className="space-y-2 text-sm">
              <li><Link className={linkCls} href="/company">{t("nav.company")}</Link></li>
              <li><Link className={linkCls} href="/services">{t("nav.services")}</Link></li>
              <li><Link className={linkCls} href="/work">{t("nav.work")}</Link></li>
              <li><Link className={linkCls} href="/partnerships">{t("nav.partnerships")}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">{t("footer.products")}</h2>
            <ul className="space-y-2 text-sm">
              {PRODUCT_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link className={linkCls} href={{ pathname: "/products/[slug]", params: { slug } }}>
                    {productNames[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">{t("footer.contact")}</h2>
            <ul className="space-y-2 text-sm">
              <li><Link className={linkCls} href="/contact">{t("nav.contact")}</Link></li>
              {siteConfig.email && (
                <li><a className={linkCls} href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
              )}
              {social.map(([name, url]) => (
                <li key={name}><a className={`${linkCls} capitalize`} href={url} rel="me noopener noreferrer" target="_blank">{name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">{t("footer.legal")}</h2>
            <ul className="space-y-2 text-sm">
              <li><Link className={linkCls} href="/privacy">{t("nav.privacy")}</Link></li>
              <li><Link className={linkCls} href="/terms">{t("nav.terms")}</Link></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-site px-4 py-5 text-xs text-white/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {siteConfig.legal.name || siteConfig.name}. {t("footer.rights")}
          {siteConfig.legal.registration && <span className="ml-2">{siteConfig.legal.registration}</span>}
        </p>
      </div>
    </footer>
  );
}
