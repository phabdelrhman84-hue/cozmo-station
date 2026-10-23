"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";

const FREE_SHIPPING_THRESHOLD = 999;

export default function FreeShippingBar() {
  const { locale } = useLanguage();
  const { subtotal } = useCart();
  const [progress, setProgress] = useState(0);

  const percentage = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const unlocked = remaining === 0 && subtotal > 0;
  const empty = subtotal === 0;

  // Animate the bar toward its target after mount / on change
  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="bg-white border border-pink/30 rounded-2xl p-4 md:p-5 max-w-7xl mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] -mt-8 relative z-20 shadow-sm flex flex-col md:flex-row items-center gap-4">
      <div className="flex items-center gap-3 md:flex-1">
        <span className="text-2xl">{unlocked ? "🎉" : "🚚"}</span>
        <div className="text-sm text-charcoal">
          {unlocked ? (
            <strong className="text-sage">
              {locale === "ar"
                ? "التوصيل مجاني على طلبك!"
                : "You've unlocked free shipping!"}
            </strong>
          ) : empty ? (
            locale === "ar" ? (
              <>
                شحن مجاني لكل الطلبات فوق{" "}
                <strong className="text-pink-dark">
                  {FREE_SHIPPING_THRESHOLD.toLocaleString()} ج.م
                </strong>
              </>
            ) : (
              <>
                Free shipping on all orders over{" "}
                <strong className="text-pink-dark">
                  {FREE_SHIPPING_THRESHOLD.toLocaleString()} EGP
                </strong>
              </>
            )
          ) : locale === "ar" ? (
            <>
              باقي{" "}
              <strong className="text-pink-dark">
                {remaining.toLocaleString()} ج.م
              </strong>{" "}
              والتوصيل علينا!
            </>
          ) : (
            <>
              Add{" "}
              <strong className="text-pink-dark">
                {remaining.toLocaleString()} EGP
              </strong>{" "}
              more for free shipping!
            </>
          )}
        </div>
      </div>

      {!empty && (
        <>
          <div className="w-full md:w-1/2">
            <div className="h-2 bg-sage-light/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sage to-pink rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-sm font-semibold whitespace-nowrap text-charcoal text-end">
            {Math.min(subtotal, FREE_SHIPPING_THRESHOLD).toLocaleString()} /{" "}
            {FREE_SHIPPING_THRESHOLD.toLocaleString()}{" "}
            {locale === "ar" ? "ج.م" : "EGP"}
          </div>
        </>
      )}
    </div>
  );
}
