import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { isIndexingEnabled } from "./src/config/indexing";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Required to be explicit since Next.js 16. One quality level keeps optimisation cheap on Vercel.
    qualities: [75],
  },
  async headers() {
    // Belt and braces with robots.txt + meta robots: a header also covers images, PDFs and API responses.
    const noindex = isIndexingEnabled() ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [{ source: "/:path*", headers: [...securityHeaders, ...noindex] }];
  },
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
