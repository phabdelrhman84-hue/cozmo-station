"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  ShoppingBag,
} from "lucide-react";

// يتطابق مع قيمة checkout/page.tsx و CartDrawer.tsx
const FREE_SHIPPING_THRESHOLD = 999;

const copy = {
  ar: {
    title: "سلة المشتريات",
    emptyTitle: "سلتك فارغة",
    emptyDesc: "يبدو أنك لم تضف أي منتجات بعد. استكشف مجموعتنا الكورية المتميزة الآن.",
    startShopping: "ابدأ التسوق",
    shippingFree: "🚚 مبروك! حصلت على شحن مجاني",
    shippingRemaining: (amount: string) => `باقي ${amount} ج.م على الشحن المجاني`,
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    shippingFreeLabel: "مجاني",
    shippingCalculated: "يُحسب عند الدفع",
    total: "الإجمالي",
    checkout: "إتمام الشراء",
    trustAuthentic: "منتجات أصلية 100% مختبرة طبياً",
    trustDelivery: "توصيل سريع لجميع المحافظات",
    currency: "ج.م",
    summary: "ملخص الطلب",
  },
  en: {
    title: "Shopping Cart",
    emptyTitle: "Your cart is empty",
    emptyDesc: "You haven't added any skincare products yet. Explore our Korean collection now.",
    startShopping: "Start Shopping",
    shippingFree: "🚚 Congrats! You got free shipping",
    shippingRemaining: (amount: string) => `Add ${amount} EGP for free shipping`,
    subtotal: "Subtotal",
    shipping: "Shipping",
    shippingFreeLabel: "Free",
    shippingCalculated: "Calculated at checkout",
    total: "Total",
    checkout: "Proceed to Checkout",
    trustAuthentic: "100% Authentic, medically tested products",
    trustDelivery: "Fast delivery to all governorates",
    currency: "EGP",
    summary: "Order Summary",
  },
};

export default function CartPage() {
  const { locale } = useLanguage();
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const c = copy[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;

  // ===== حالة السلة الفارغة =====
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 py-20">
        <div className="bg-beige p-8 rounded-full">
          <ShoppingBag size={60} className="text-beige-dark" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal">{c.emptyTitle}</h1>
        <p className="text-warm-gray text-center max-w-xs leading-relaxed">
          {c.emptyDesc}
        </p>
        <Link href="/products" className="btn-primary">
          {c.startShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black mb-10 text-charcoal">{c.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* ===== قائمة المنتجات ===== */}
        <div className="lg:col-span-8 space-y-6">

          {/* AOV Booster: شريط الشحن المجاني */}
          <div className="bg-beige-light p-5 rounded-2xl border border-beige-dark">
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="font-bold text-charcoal">
                {remaining > 0
                  ? c.shippingRemaining(remaining.toLocaleString())
                  : c.shippingFree}
              </span>
              <span className="text-warm-gray font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-beige-dark h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink to-sage rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* قائمة المنتجات */}
          <div className="space-y-4">
            {items.map((item) => {
              const name =
                locale === "ar" ? item.product.name_ar : item.product.name_en;
              const lineTotal = item.product.price_egp * item.quantity;
              const isLocalImage = item.product.main_image?.startsWith("/");

              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white border border-beige-dark rounded-2xl hover:border-pink/30 transition-colors duration-200 animate-fade-in"
                >
                  {/* صورة المنتج */}
                  <div className="relative w-24 h-32 bg-beige rounded-xl overflow-hidden shrink-0">
                    {item.product.main_image ? (
                      <Image
                        src={item.product.main_image}
                        alt={name}
                        fill
                        sizes="96px"
                        className="object-cover"
                        unoptimized={isLocalImage}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-pink-light/30 to-sage-light/30">
                        {item.product.category === "Haircare" ? "💇‍♀️" : "🧴"}
                      </div>
                    )}
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="flex flex-col justify-between py-1 flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-warm-gray uppercase tracking-wider font-semibold mb-0.5">
                          {item.product.brand}
                        </p>
                        <h3 className="font-bold text-charcoal line-clamp-2 leading-snug text-sm">
                          {name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        aria-label="حذف المنتج"
                        className="p-1.5 text-warm-gray hover:text-error transition-colors shrink-0 rounded-lg hover:bg-error/5"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-3">
                      {/* أزرار الكمية */}
                      <div className="flex items-center gap-2 bg-beige-light rounded-xl border border-beige-dark px-1.5 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-5 text-center text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* السعر الإجمالي للصف */}
                      <span className="font-black text-lg text-charcoal">
                        {lineTotal.toLocaleString()}{" "}
                        <span className="text-sm font-medium text-warm-gray">
                          {c.currency}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== ملخص الطلب ===== */}
        <div className="lg:col-span-4">
          <div className="bg-white p-7 rounded-3xl border border-beige-dark shadow-soft sticky top-24">
            <h2 className="text-xl font-bold text-charcoal mb-6">{c.summary}</h2>

            <div className="space-y-3 mb-6">
              {/* الفرعي */}
              <div className="flex justify-between text-sm text-warm-gray">
                <span>{c.subtotal}</span>
                <span className="font-bold text-charcoal">
                  {subtotal.toLocaleString()} {c.currency}
                </span>
              </div>
              {/* الشحن */}
              <div className="flex justify-between text-sm text-warm-gray pb-4 border-b border-dashed border-beige-dark">
                <span>{c.shipping}</span>
                <span className={`font-bold ${shippingFree ? "text-sage" : "text-warm-gray"}`}>
                  {shippingFree ? c.shippingFreeLabel : c.shippingCalculated}
                </span>
              </div>
              {/* الإجمالي */}
              <div className="flex justify-between text-lg font-black text-charcoal pt-1">
                <span>{c.total}</span>
                <span className="text-pink-dark">
                  {subtotal.toLocaleString()} {c.currency}
                </span>
              </div>
            </div>

            {/* زر الدفع */}
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-4 rounded-2xl font-bold text-base hover:bg-pink-dark transition-all duration-300 active:scale-95 shadow-md hover:shadow-pink/30 hover:shadow-lg"
            >
              {c.checkout}
              <Arrow size={20} />
            </Link>

            {/* Trust Badges */}
            <div className="mt-7 space-y-3 border-t border-beige-dark pt-6">
              <div className="flex items-center gap-3 text-sm text-warm-gray">
                <ShieldCheck className="text-sage shrink-0" size={20} />
                <span>{c.trustAuthentic}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-warm-gray">
                <Truck className="text-pink shrink-0" size={20} />
                <span>{c.trustDelivery}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
