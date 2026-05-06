"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";

export default function FreeShippingBar() {
  const { locale } = useLanguage();
  const [progress, setProgress] = useState(0);
  
  const currentAmount = 230;
  const targetAmount = 350;
  const percentage = Math.min(100, (currentAmount / targetAmount) * 100);
  const remaining = targetAmount - currentAmount;

  // Animate on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="bg-white border border-pink/30 rounded-2xl p-4 md:p-5 max-w-7xl mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] -mt-8 relative z-20 shadow-sm flex flex-col md:flex-row items-center gap-4">
      <div className="flex items-center gap-3 md:w-1/3">
        <span className="text-2xl">🚚</span>
        <div className="text-sm">
          {locale === "ar" ? (
            <>
              أضيفي <strong className="text-pink-dark">{remaining} ج.م</strong> فقط للحصول على شحن مجاني!
            </>
          ) : (
            <>
              Add <strong className="text-pink-dark">{remaining} EGP</strong> more to get free shipping!
            </>
          )}
        </div>
      </div>
      
      <div className="w-full md:w-1/2">
        <div className="h-2 bg-sage-light/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sage to-pink rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="text-sm font-semibold whitespace-nowrap text-charcoal md:w-1/6 text-end">
        {currentAmount} / {targetAmount} {locale === "ar" ? "ج.م" : "EGP"}
      </div>
    </div>
  );
}
