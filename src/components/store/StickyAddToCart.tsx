"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Product } from "@/types";

/**
 * شريط "أضيفي للسلة" ثابت أسفل الشاشة على الموبايل — بيظهر لما زر
 * الإضافة الأساسي يخرج من الشاشة. بيرفع معدل التحويل على صفحة المنتج.
 */
export default function StickyAddToCart({
  product,
  show,
  added,
  disabled,
  onAdd,
}: {
  product: Product;
  show: boolean;
  added: boolean;
  disabled: boolean;
  onAdd: () => void;
}) {
  const { locale, t } = useLanguage();
  const name = locale === "ar" ? product.name_ar : product.name_en;

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-14 z-40 bg-white border-t border-beige-dark px-4 py-3 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-[calc(100%+3.5rem)]"
      }`}
    >
      <div className="w-11 h-11 rounded-lg overflow-hidden bg-beige-light shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            product.main_image && product.main_image.startsWith("http")
              ? product.main_image
              : "/placeholder.png"
          }
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p dir="auto" className="text-xs font-medium text-charcoal truncate">
          {name}
        </p>
        <p className="text-sm font-bold text-pink-dark">
          {product.price_egp.toLocaleString()}{" "}
          {locale === "ar" ? "ج.م" : "EGP"}
        </p>
      </div>
      <button
        onClick={onAdd}
        disabled={disabled}
        className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all ${
          added
            ? "bg-sage text-white"
            : disabled
            ? "bg-warm-gray-light text-white"
            : "bg-pink text-white hover:bg-pink-dark active:scale-95"
        }`}
      >
        {added ? (
          <>
            <Check size={18} />
            {t("products.added")}
          </>
        ) : disabled ? (
          t("products.out_of_stock")
        ) : (
          <>
            <ShoppingBag size={18} />
            {t("products.add_to_cart")}
          </>
        )}
      </button>
    </div>
  );
}
