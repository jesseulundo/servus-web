import Link from "next/link";

// Fallback for requests outside any locale (e.g. /xyz without a prefix match).
export default function GlobalNotFound() {
  return (
    <html lang="pt">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1rem", textAlign: "center", color: "#24343d" }}>
        <h1 style={{ color: "#061e2d" }}>404</h1>
        <p>
          <Link href="/pt">Servus — Início</Link> · <Link href="/en">Servus — Home</Link>
        </p>
      </body>
    </html>
  );
}
