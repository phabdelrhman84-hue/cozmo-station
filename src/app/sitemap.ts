import type { MetadataRoute } from "next";
import { getAllProductHandles } from "@/lib/shopify";
import { SITE_URL } from "@/lib/site";

// يُعاد توليده كل ساعة ليشمل المنتجات الجديدة
export const revalidate = 3600;

const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.4 },
  { path: "/returns", priority: 0.3 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProductHandles();

  return [
    ...STATIC_PAGES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      priority,
    })),
    ...products.map(({ handle, updatedAt }) => ({
      url: `${SITE_URL}/product/${encodeURIComponent(handle)}`,
      lastModified: updatedAt,
      priority: 0.8,
    })),
  ];
}
