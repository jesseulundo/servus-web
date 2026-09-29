/**
 * Search-engine indexing is OFF unless SITE_INDEXING=on.
 * Keeps previews and the temporary *.vercel.app address out of Google until launch,
 * when the real domain is connected and approved content is in place.
 */
export const indexingEnabled = process.env.SITE_INDEXING === "on";
