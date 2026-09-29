import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { indexingEnabled } from "@/config/indexing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexingEnabled ? { userAgent: "*", allow: "/", disallow: "/api/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
