/**
 * src/lib/site.ts
 * ===============
 * الرابط الأساسي للموقع — يُستخدم في canonical والـ sitemap والـ robots والـ JSON-LD.
 *
 * الأولوية:
 *   1. NEXT_PUBLIC_SITE_URL       → الدومين النهائي (مثال: https://cozmostation.com)
 *   2. VERCEL_PROJECT_PRODUCTION_URL → دومين الإنتاج على Vercel (يُضبط تلقائياً)
 *   3. http://localhost:3000       → التطوير المحلي
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Cozmo Station";

/** نص عادي من HTML — للوصف في meta و JSON-LD */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** قص النص عند حد كلمة بدون تجاوز max حرف */
export function truncate(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trim()}…`;
}
