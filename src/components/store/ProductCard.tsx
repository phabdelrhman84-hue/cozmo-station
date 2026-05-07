"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, Check, Eye } from "lucide-react";
import type { Product } from "@/types";
import { getDiscountPercentage } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, t } = useLanguage();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const name = locale === "ar" ? product.name_ar : product.name_en;
  const discount = product.compare_price_egp
    ? getDiscountPercentage(product.price_egp, product.compare_price_egp)
    : 0;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-white">
          <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
            {product.main_image ? (
              <img 
                src={product.main_image} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-beige to-beige-dark">
                 {product.category === "Haircare" ? "💇‍♀️" : "🧴"}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 start-3 flex flex-col gap-1.5">
            {product.is_new && (
              <span className="px-2.5 py-1 bg-sage text-white text-xs font-bold rounded-full">
                {t("products.new")}
              </span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 bg-error text-white text-xs font-bold rounded-full">
                -{discount}%
              </span>
            )}
            {product.is_featured && !product.is_new && !discount && (
              <span className="px-2.5 py-1 bg-pink text-white text-xs font-bold rounded-full">
                {t("products.featured")}
              </span>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div
            className={`absolute inset-0 bg-black/10 flex items-center justify-center gap-3 transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                added
                  ? "bg-sage text-white scale-110"
                  : isOutOfStock
                  ? "bg-warm-gray-light text-white cursor-not-allowed"
                  : "bg-white text-charcoal hover:bg-pink hover:text-white hover:scale-110"
              }`}
            >
              {added ? <Check size={20} /> : <ShoppingBag size={20} />}
            </button>
            <div className="w-12 h-12 rounded-full bg-white text-charcoal flex items-center justify-center shadow-lg hover:bg-pink hover:text-white transition-all hover:scale-110">
              <Eye size={20} />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold text-charcoal line-clamp-2 min-h-[2.5rem] leading-5 group-hover:text-pink-dark transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-pink-dark">
              {product.price_egp.toLocaleString()}{" "}
              <span className="text-xs font-normal">
                {locale === "ar" ? "ج.م" : "EGP"}
              </span>
            </span>
            {product.compare_price_egp && (
              <span className="text-sm text-warm-gray line-through">
                {product.compare_price_egp.toLocaleString()}
              </span>
            )}
          </div>
          {isOutOfStock && (
            <p className="text-xs text-error font-medium mt-1">
              {t("products.out_of_stock")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
