"use client";

/**
 * Last-resort error page, used only if the root layout itself fails. It replaces the whole
 * document, so it can't use translations or the site stylesheet: bilingual text, inline styles.
 */
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="pt">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#061e2d", color: "#fff" }}>
        <title>ServUS</title>
        <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
          <div style={{ maxWidth: "32rem" }}>
            <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.5rem" }}>Algo correu mal</h1>
            <p style={{ margin: "0 0 1.5rem", opacity: 0.85 }}>Something went wrong. Please try again in a moment.</p>
            <button
              type="button"
              onClick={() => retry()}
              style={{ background: "#3f7124", color: "#fff", border: 0, borderRadius: 999, padding: "0.75rem 1.5rem", fontSize: "1rem", cursor: "pointer" }}
            >
              Tentar novamente · Try again
            </button>
            <p style={{ marginTop: "1.5rem" }}>
              {/* A full page load on purpose: the app shell itself failed, so client navigation can't be trusted. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" style={{ color: "#b8db9f" }}>
                ServUS · início / home
              </a>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
