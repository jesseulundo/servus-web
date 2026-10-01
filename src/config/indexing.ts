/**
 * Search-engine indexing is OFF unless SITE_INDEXING=on.
 * Keeps previews and the temporary *.vercel.app address out of Google until launch,
 * when the real domain is connected and approved content is in place.
 */
export function isIndexingEnabled(env: Record<string, string | undefined> = process.env): boolean {
  // Vercel sets VERCEL_ENV to "preview" for branch/PR deployments: those are never indexable,
  // even if SITE_INDEXING=on was accidentally added to the Preview environment.
  return env.SITE_INDEXING === "on" && (env.VERCEL_ENV ?? "production") === "production";
}

export const indexingEnabled = isIndexingEnabled();
