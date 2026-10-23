"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import ProductCard from "@/components/store/ProductCard";

/**
 * رِيل "شاهدتِ مؤخراً". يظهر فقط لو فيه 2+ منتجات.
 * excludeId: لاستبعاد المنتج الحالي في صفحة المنتج.
 */
export default function RecentlyViewed({
  excludeId,
  className = "",
}: {
  excludeId?: number;
  className?: string;
}) {
  const { locale } = useLanguage();
  const { items } = useRecentlyViewed();

  const list = items.filter((p) => p.id !== excludeId).slice(0, 4);
  if (list.length < 2) return null;

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-charcoal mb-6">
          {locale === "ar" ? "شاهدتِ مؤخراً" : "Recently viewed"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
