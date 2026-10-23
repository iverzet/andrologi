import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.indexable ? { userAgent: "*", allow: "/", disallow: ["/admin", "/medici/demo-"] } : { userAgent: "*", disallow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).href,
  };
}
