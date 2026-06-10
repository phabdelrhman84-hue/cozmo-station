"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const { locale, t } = useLanguage();
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
    isOpen,
    closeCart,
  } = useCart();

  const freeShippingThreshold = 999;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 ${
          locale === "ar" ? "left-0" : "right-0"
        } h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : locale === "ar"
            ? "-translate-x-full"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-beige-dark">
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} className="text-pink" />
            <h2 className="text-lg font-bold text-charcoal">
              {t("cart.title")}
            </h2>
            <span className="text-sm text-warm-gray">({totalItems})</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-beige transition-colors"
          >
            <X size={20} className="text-charcoal" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-beige-light">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-warm-gray">
                {remaining > 0
                  ? t("cart.free_shipping_remaining").replace(
                      "{amount}",
                      remaining.toLocaleString()
                    )
                  : "🎉 " +
                    (locale === "ar"
                      ? "مبروك! حصلت على شحن مجاني"
                      : "Congrats! You got free shipping")}
              </span>
            </div>
            <div className="h-2 bg-beige-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink to-sage rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-beige-dark mb-4" />
              <p className="text-lg font-semibold text-charcoal mb-1">
                {t("cart.empty")}
              </p>
              <p className="text-warm-gray text-sm mb-6">
                {t("cart.empty_desc")}
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="btn-primary"
              >
                {t("cart.browse")}
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-beige-light rounded-xl p-3 animate-fade-in"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg bg-beige flex-shrink-0 overflow-hidden">
                  {item.product.main_image ? (
                    <img 
                      src={item.product.main_image} 
                      alt={locale === "ar" ? item.product.name_ar : item.product.name_en} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-light/30 to-sage-light/30 flex items-center justify-center text-2xl">
                      🧴
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-charcoal truncate">
                    {locale === "ar"
                      ? item.product.name_ar
                      : item.product.name_en}
                  </h3>
                  <p className="text-pink-dark font-bold mt-1">
                    {item.product.price_egp.toLocaleString()}{" "}
                    {locale === "ar" ? "ج.م" : "EGP"}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-white rounded-full px-1 py-0.5">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-beige transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-beige transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 text-warm-gray hover:text-error transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-beige-dark p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-warm-gray">{t("cart.subtotal")}</span>
              <span className="font-bold text-charcoal">
                {subtotal.toLocaleString()} {locale === "ar" ? "ج.م" : "EGP"}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary block w-full text-center text-lg"
            >
              {t("cart.checkout")}
            </Link>
             <Link
              href="/products"
              onClick={closeCart}
              className="btn-secondary block w-full text-center text-sm"
            >
              {locale === "ar" ? "مواصلة التسوق" : "Continue Shopping"}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
