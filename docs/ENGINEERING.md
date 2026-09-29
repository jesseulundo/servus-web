# Servus Website: Engineering Brief v0.1

**Source:** *Servus Guia de Marca e Website* v1.0 (Sept 2026)
**Status:** Engineering foundation built (blueprint phases 2 and 5, first pass). Ready for PM and design input.

---

## 1. What exists today

A working, responsive, bilingual (PT/EN) website that implements the blueprint's MVP:

| Blueprint page | PT URL | EN URL | Notes |
|---|---|---|---|
| Início | `/pt` | `/en` | Hero, capabilities, products, work, method, trust, short contact form |
| Empresa | `/pt/empresa` | `/en/company` | Mission, vision, promise, 5 principles, markets |
| Serviços + 6 pages | `/pt/servicos/[slug]` | `/en/services/[slug]` | Each follows the blueprint's 6-part structure |
| Produtos + 4 pages | `/pt/produtos/[slug]` | `/en/products/[slug]` | Status shown on every card and page |
| Trabalhos + 3 cases | `/pt/trabalhos/[slug]` | `/en/work/[slug]` | 6-block case-study template |
| Parcerias | `/pt/parcerias` | `/en/partnerships` | 5 collaboration models + partnership form |
| Contactos | `/pt/contactos?form=…` | `/en/contact?form=…` | Form picker covering all 5 blueprint forms |
| Privacidade | `/pt/privacidade` | `/en/privacy` | Placeholder, set to noindex until legal approves |

**Stack (per blueprint):** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, next-intl 4, zod. No database. Content is versioned in the repo (blueprint phase 1).

**Quality in place:**
- **SEO:** per-page title and description, canonical URLs, hreflang alternates, Open Graph image, `sitemap.xml`, `robots.txt`, and JSON-LD for Organization, Service and SoftwareApplication.
- **Accessibility:** skip link, visible focus, full keyboard navigation, native `<details>` FAQ, labelled form fields with linked errors, and an error summary that receives focus. Honours reduced-motion settings. Product status is always shown as text, never by colour alone.
- **Security:** validation runs on the server. There is a same-origin check, a body-size cap, two-tier rate limiting, a honeypot field and a minimum fill time. Email credentials exist only on the server, and security headers are set.
- **Tests:** 15 unit tests covering the schemas, spam checks and rate limiter. They also check that every locale has every UI string and form label.

## 2. Architecture decisions

1. **One definition per form.** `src/lib/forms/definitions.ts` generates both the UI and the server-side zod schema. Adding a field takes one line there plus its label in `messages/*.json`.
2. **Content is split from the catalog.** `src/content/catalog.ts` holds the data that doesn't change by language: slugs, status, URLs, accent colours and publication state. `src/content/locales/{pt,en}.ts` holds the copy. TypeScript blocks the build if a locale is missing a service, product or case study. The shape maps directly onto a headless CMS later.
3. **Draft / approved flag.** Unapproved products and case studies show a visible "provisional content" banner, get `noindex`, and are left out of the sitemap. Unapproved content cannot quietly go live.
4. **Adding Japanese or French** is config only: add the locale in `src/i18n/routing.ts`, add one messages file and one content file. The tests and the type checker list anything that's missing.
5. **Email delivery** goes to one inbox per form, set through env vars (`FORM_TO_*`), using the Resend HTTP API. In production without credentials the API returns 503, so no submission is silently lost. `FORM_DELIVERY=log` is for staging.
6. **Analytics is vendor-neutral.** `track()` sends `form_start`, `form_error` and `form_submit`, but nothing is recorded until a consent-based tool is connected.

## 3. Deviations from the blueprint (need design sign-off)

- **Green button contrast.** White text on Servus Green `#4F8B2E` is 4.15:1, below WCAG AA (4.5:1). Buttons and links that carry text use a darker `#3F7124` (5.84:1). The official green stays for graphics and the logo.
- **Orange text.** Orange `#D85B05` on white is 3.88:1, so it is used only as an accent. Error text uses a darker orange `#A84504`.
- **Logo.** Only a raster PNG was supplied. I derived horizontal, vertical, dark-background (white wordmark), monochrome and favicon versions from it without changing the geometry. **Official SVG masters are still needed.**
- **Extra form.** Added a sixth form, the MOAMBEIRA interest list, because the blueprint's "Entrar na lista de interesse" action needs somewhere to send submissions.

## 4. Open questions for the PM

These are the blueprint's "Decisões para iniciar o design" plus items that came up during the build. Each has a `TODO(owner)` marker in the code.

1. **Brand spelling:** the text says "Servus" and the logo says "ServUS". Which is official?
2. **Domain and hosting:** production domain, and whether to use Vercel or an equivalent.
3. **Inboxes and owners** for each form (service, partnership, demo, general, support) and a realistic response time. The site currently promises "2 business days".
4. **Budget currency** in the forms. The site currently shows USD because the target markets span JP, AO and others.
5. **Public URLs** for Trumuno Footy and Audio Cleaner. Until they are set, those pages show "Public link coming soon".
6. **Partner approvals** for IBEX, Fenix Academy and Urolundo, including Urolundo's market. All three are drafts.
7. **Public roadmap** for MOAMBEIRA and RH, plus legal review for MOAMBEIRA.
8. **Analytics tool** (consent-based) and whether a cookie banner is needed.
9. **Service page copy.** Text beyond the blueprint's tables (impacts, process steps, FAQ) is draft and needs review.
10. **English copy** needs review by a fluent editor. The blueprint rules out unreviewed translation.
11. **Team section** on Empresa: when, and who appears.
12. **Rate limiting at scale.** The in-memory limiter works on a single instance. On serverless hosting, switch to Upstash or Redis (the interface is ready).

## 5. Suggested next steps

1. PM answers section 4. Most answers are one-line config changes.
2. Design reviews the build against the blueprint's first design package (header/footer, homepage, service grid, product cards, case study, product page, forms). It is all implemented and can be adjusted in place.
3. Deploy a preview (phase 4 prototype) and test it with potential clients before launch.
4. Phase 2: blog/news ("Conteúdos"), CMS migration, CRM and calendar integrations, each added only when someone internal owns the data it produces.

## 6. Running it

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000 → redirects to /pt
npm run check        # typecheck + lint + unit tests
npm run build && npm start
```
