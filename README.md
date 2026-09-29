# Servus Website

Corporate website for Servus, built from *Servus Guia de Marca e Website* v1.0.
Next.js 16 · TypeScript · Tailwind CSS 4 · next-intl (PT/EN, ready for JA/FR).

See **[docs/ENGINEERING.md](docs/ENGINEERING.md)** for architecture, decisions and open questions.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
npm run check          # typecheck + lint + tests
```

## Where things live

| Path | What |
|---|---|
| `src/content/catalog.ts` | Slugs, product status, URLs, draft/approved flags |
| `src/content/locales/*.ts` | Page copy per language (type-checked for completeness) |
| `messages/*.json` | UI strings: nav, footer, forms, errors |
| `src/lib/forms/definitions.ts` | All forms: fields, options, destination inbox |
| `src/app/api/forms/[type]/route.ts` | Form endpoint (validation, spam, rate limit, delivery) |
| `src/i18n/routing.ts` | Locales and localized URLs |
| `src/app/globals.css` | Design tokens (brand palette, fonts) |
| `public/brand/` | Logo variants derived from the official PNG |

## Common changes

- **Edit copy:** change `src/content/locales/pt.ts` and `en.ts`.
- **Publish a case study:** set `publication: "approved"` in `catalog.ts`.
- **Add a form field:** add one line in `definitions.ts` and its label in both `messages/*.json`.
- **Add a language:** add it to `routing.ts`, then add `messages/<code>.json` and `src/content/locales/<code>.ts`, and register it in `src/content/index.ts`.

## Deploying (Vercel)

- Every push to `main` deploys to production; every other branch gets its own preview URL.
- `NEXT_PUBLIC_*` variables and `SITE_INDEXING` are read at **build** time. Redeploy after changing them.
- Keep `SITE_INDEXING` empty until launch on the real domain.
