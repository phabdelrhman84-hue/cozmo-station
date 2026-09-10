"use client";

import { useMemo, useState } from "react";
import { Plus, Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types";

/**
 * "يُشترى عادةً معه" — المنتج الحالي + منتجَين مكمّلين مع checkboxes
 * وزر إضافة المحدد للسلة. رافع AOV مباشر على صفحة المنتج.
 * الأسعار كاملة (مفيش خصم وهمي).
 */
export default function FrequentlyBoughtTogether({
  product,
}: {
  product: Product;
}) {
  const { locale } = useLanguage();
  const { addItem } = useCart();
  const { products } = useProducts();

  const suggestions = useMemo(() => {
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          p.stock > 0 &&
          p.main_image &&
          // فضّل تصنيف مختلف (تكامل روتين بدل تكرار)
          true
      )
      .sort((a, b) => {
        const sameCatA = a.category === product.category ? 1 : 0;
        const sameCatB = b.category === product.category ? 1 : 0;
        if (sameCatA !== sameCatB) return sameCatA - sameCatB;
        const fa = a.is_featured ? 0 : 1;
        const fb = b.is_featured ? 0 : 1;
        if (fa !== fb) return fa - fb;
        return a.price_egp - b.price_egp;
      })
      .slice(0, 2);
  }, [products, product]);

  // المنتج الحالي دايماً محدد؛ الاقتراحات محددة افتراضياً
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  if (suggestions.length === 0) return null;

  const isChecked = (id: number) => selected[id] !== false; // default true

  const toggle = (id: number) =>
    setSelected((prev) => ({ ...prev, [id]: !isChecked(id) }));

  const chosen = suggestions.filter((p) => isChecked(p.id));
  const total =
    product.price_egp + chosen.reduce((s, p) => s + p.price_egp, 0);

  const addAll = () => {
    addItem(product, 1);
    chosen.forEach((p) => addItem(p, 1));
  };

  const line = (p: Product, isCurrent: boolean) => (
    <label
      key={p.id}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
        isCurrent
          ? "border-beige-dark bg-beige-light"
          : "border-beige-dark bg-white cursor-pointer hover:border-pink/50"
      }`}
    >
      <span
        className={`shrink-0 w-5 h-5 rounded-md border flex items-center justify-center ${
          isChecked(p.id)
            ? "bg-pink border-pink text-white"
            : "border-beige-dark bg-white"
        }`}
      >
        {isChecked(p.id) && <Check size={13} strokeWidth={3} />}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked(p.id)}
        disabled={isCurrent}
        onChange={() => !isCurrent && toggle(p.id)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.main_image || "/placeholder.png"}
        alt={locale === "ar" ? p.name_ar : p.name_en}
        className="w-12 h-12 rounded-lg object-cover bg-white shrink-0"
      />
      <span className="flex-1 min-w-0 text-sm text-charcoal line-clamp-2 leading-tight">
        {isCurrent && (
          <span className="text-warm-gray">
            {locale === "ar" ? "هذا المنتج: " : "This item: "}
          </span>
        )}
        {locale === "ar" ? p.name_ar : p.name_en}
      </span>
      <span className="shrink-0 text-sm font-bold text-charcoal">
        {p.price_egp.toLocaleString()}{" "}
        <span className="text-xs font-medium text-warm-gray">
          {locale === "ar" ? "ج.م" : "EGP"}
        </span>
      </span>
    </label>
  );

  return (
    <div className="mt-14 border-t border-beige-dark pt-10">
      <h2 className="text-2xl font-bold text-charcoal mb-6">
        {locale === "ar" ? "يُشترى عادةً معه" : "Frequently bought together"}
      </h2>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-2">
          {line(product, true)}
          {suggestions.map((p) => line(p, false))}
        </div>

        <div className="bg-beige-light rounded-2xl p-5 text-center lg:w-64">
          <p className="text-sm text-warm-gray mb-1">
            {locale === "ar"
              ? `إجمالي ${chosen.length + 1} منتجات`
              : `Total for ${chosen.length + 1} items`}
          </p>
          <p className="text-2xl font-extrabold text-charcoal mb-4">
            {total.toLocaleString()}{" "}
            <span className="text-base font-medium">
              {locale === "ar" ? "ج.م" : "EGP"}
            </span>
          </p>
          <button
            onClick={addAll}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Plus size={18} strokeWidth={2.5} />
            {locale === "ar" ? "أضيفي المحدد للسلة" : "Add selected to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
