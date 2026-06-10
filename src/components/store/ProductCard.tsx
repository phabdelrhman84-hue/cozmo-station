"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { getDiscountPercentage } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product & { handle?: string };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, t } = useLanguage();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const name = locale === "ar" ? product.name_ar : product.name_en;
  const discount = product.compare_price_egp
    ? getDiscountPercentage(product.price_egp, product.compare_price_egp)
    : 0;
  const isOutOfStock = product.stock <= 0;
  const imageSrc = product.main_image && product.main_image.startsWith("http")
    ? product.main_image
    : "/placeholder.png";

  // ترجمة الـ Badges المبنية على خصائص المنتج الحالية
  const scienceBadge = discount > 0
    ? `${locale === "ar" ? "خصم" : "Save"} ${discount}%`
    : null;

  const trendBadge = product.is_new
    ? (locale === "ar" ? "🔥 وصل حديثاً" : "🔥 New Arrival")
    : product.is_featured
      ? (locale === "ar" ? "⭐ الأكثر مبيعاً" : "⭐ Best Seller")
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-beige-dark overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 h-full">

      {/* ===== حاوية الصورة ===== */}
      <div className="relative w-full aspect-[4/5] bg-[#F9F9F9] overflow-hidden">

        {/* Text Overlays — أعلى يمين بشكل منطقي RTL/LTR */}
        <div className="absolute top-3 end-3 z-10 flex flex-col gap-2 items-end">
          {scienceBadge && (
            <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              {scienceBadge}
            </span>
          )}
          {trendBadge && (
            <span className="bg-rose-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              {trendBadge}
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-warm-gray/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              {t("products.out_of_stock")}
            </span>
          )}
        </div>

        {/* الصورة */}
        <Link href={`/product/${product.handle || product.slug}`} className="block w-full h-full">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            unoptimized={imageSrc === "/placeholder.png"}
          />
        </Link>
      </div>

      {/* ===== تفاصيل المنتج (CRO) ===== */}
      <div className="p-4 flex flex-col flex-grow">

        {/* البراند */}
        <span className="text-xs text-warm-gray mb-1.5 font-semibold tracking-wider uppercase">
          {product.brand}
        </span>

        {/* الاسم */}
        <Link href={`/product/${product.handle || product.slug}`} className="mb-3">
          <h3 className="font-bold text-charcoal leading-snug line-clamp-2 group-hover:text-pink-dark transition-colors duration-200">
            {name}
          </h3>
        </Link>

        {/* السعر + زر الإضافة للسلة */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-beige-dark/50">
          <div className="flex flex-col">
            {product.compare_price_egp && (
              <span className="text-xs text-warm-gray line-through font-medium">
                {product.compare_price_egp.toLocaleString()}{" "}
                {locale === "ar" ? "ج.م" : "EGP"}
              </span>
            )}
            <span className="font-black text-lg text-charcoal">
              {product.price_egp.toLocaleString()}{" "}
              <span className="text-sm font-medium text-warm-gray">
                {locale === "ar" ? "ج.م" : "EGP"}
              </span>
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={t("products.add_to_cart")}
            className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-md active:scale-95 ${added
                ? "bg-sage text-white"
                : isOutOfStock
                  ? "bg-beige-dark text-warm-gray cursor-not-allowed"
                  : "bg-charcoal text-white hover:bg-pink-dark hover:shadow-pink/30 hover:shadow-lg"
              }`}
          >
            {added ? (
              <Check strokeWidth={2.5} size={20} />
            ) : (
              <ShoppingCart strokeWidth={2.5} size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
