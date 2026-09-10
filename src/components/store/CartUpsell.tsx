"use client";

import { useMemo } from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";

/**
 * صف توصيات داخل الـ Cart Drawer — "أكملي روتينك".
 * بيقترح منتجات مش في السلة، إضافة بضغطة واحدة. أكبر رافع AOV.
 */
export default function CartUpsell() {
  const { locale } = useLanguage();
  const { items, addItem } = useCart();
  const { products } = useProducts();

  const suggestions = useMemo(() => {
    const inCart = new Set(items.map((i) => i.product.id));
    return products
      .filter((p) => !inCart.has(p.id) && p.stock > 0 && p.main_image)
      .sort((a, b) => {
        // المميّز الأول، وبعده الأرخص (يسهّل قبول الإضافة)
        const fa = a.is_featured ? 0 : 1;
        const fb = b.is_featured ? 0 : 1;
        if (fa !== fb) return fa - fb;
        return a.price_egp - b.price_egp;
      })
      .slice(0, 6);
  }, [products, items]);

  if (items.length === 0 || suggestions.length === 0) return null;

  return (
    <div className="border-t border-beige-dark px-5 py-4">
      <p className="text-sm font-bold text-charcoal mb-3">
        {locale === "ar" ? "أضيفي لروتينك ✨" : "Complete your routine ✨"}
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none snap-x">
        {suggestions.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-32 bg-beige-light rounded-xl p-2 flex flex-col"
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-white mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.main_image}
                alt={locale === "ar" ? p.name_ar : p.name_en}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] font-medium text-charcoal line-clamp-2 leading-tight mb-1 min-h-[28px]">
              {locale === "ar" ? p.name_ar : p.name_en}
            </p>
            <div className="mt-auto flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-pink-dark">
                {p.price_egp.toLocaleString()}
                <span className="text-[9px] font-medium text-warm-gray">
                  {" "}
                  {locale === "ar" ? "ج.م" : "EGP"}
                </span>
              </span>
              <button
                onClick={() => addItem(p, 1)}
                aria-label={locale === "ar" ? "أضيفي للسلة" : "Add to cart"}
                className="shrink-0 w-7 h-7 rounded-full bg-charcoal text-white flex items-center justify-center hover:bg-pink-dark transition-colors active:scale-95"
              >
                <Plus size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
