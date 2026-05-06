"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function RoutineBuilder() {
  const { locale } = useLanguage();
  
  const steps = [
    {
      id: 1,
      emoji: "🧼",
      name_ar: "تنظيف",
      name_en: "Cleanser",
      product: "COSRX Low pH Good Morning Cleanser",
      price: 145,
    },
    {
      id: 2,
      emoji: "💦",
      name_ar: "تونر",
      name_en: "Toner",
      product: "PYUNKANG YUL Essence Toner",
      price: 178,
    },
    {
      id: 3,
      emoji: "💊",
      name_ar: "سيروم",
      name_en: "Serum",
      product: "COSRX Snail 96 Mucin Essence",
      price: 228,
    },
    {
      id: 4,
      emoji: "🌸",
      name_ar: "مرطب",
      name_en: "Moisturizer",
      product: "Laneige Water Bank Moisture Cream",
      price: 295,
    },
    {
      id: 5,
      emoji: "☀️",
      name_ar: "واقي شمس",
      name_en: "Sunscreen",
      product: "Beauty of Joseon Relief Sun SPF50+",
      price: 272,
    },
  ];

  const [selectedSteps, setSelectedSteps] = useState<number[]>([1, 2, 3]);

  const toggleStep = (id: number) => {
    setSelectedSteps((prev) =>
      prev.includes(id) ? prev.filter((stepId) => stepId !== id) : [...prev, id]
    );
  };

  const total = steps
    .filter((step) => selectedSteps.includes(step.id))
    .reduce((sum, step) => sum + step.price, 0);

  const discounted = Math.round(total * 0.75);
  const savings = total - discounted;

  return (
    <section className="bg-charcoal text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-pink font-bold tracking-widest uppercase text-sm mb-3">
            {locale === "ar" ? "🌙 وفري مع الباقات" : "🌙 Save with Bundles"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {locale === "ar" ? (
              <>ابني روتينك الكامل و<em className="text-pink not-italic">وفري 25%</em></>
            ) : (
              <>Build your routine & <em className="text-pink not-italic">Save 25%</em></>
            )}
          </h2>
          <p className="text-white/60">
            {locale === "ar"
              ? "اختاري المنتجات اللي تناسب بشرتك وهنجيبهالك مع بعض بخصم خاص"
              : "Choose the products that fit your skin and get them together with a special discount"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {steps.map((step) => {
            const isSelected = selectedSteps.includes(step.id);
            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`relative bg-white/5 border rounded-2xl p-6 text-center transition-all cursor-pointer hover:-translate-y-1 ${
                  isSelected
                    ? "bg-pink/10 border-pink/50 shadow-[0_0_15px_rgba(242,196,206,0.2)]"
                    : "border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                  {step.id}
                </div>
                <span className="text-4xl block mb-3">{step.emoji}</span>
                <div className="text-sm font-semibold mb-1">
                  {locale === "ar" ? step.name_ar : step.name_en}
                </div>
                <div className="text-xs text-white/60 leading-relaxed mb-3 h-8 flex items-center justify-center">
                  {step.product}
                </div>
                <div className="text-pink font-bold text-sm">
                  {step.price} {locale === "ar" ? "ج.م" : "EGP"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-sage font-semibold text-sm mb-1">
              ✅ {locale === "ar" ? `أنتِ وفرتِ ${savings} ج.م مع الباقة` : `You saved ${savings} EGP with the bundle`}
            </div>
            <div className="text-sm text-white/50">
              {selectedSteps.length} {locale === "ar" ? "منتجات مختارة" : "selected products"}
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm text-white/50 line-through">
              {total} {locale === "ar" ? "ج.م" : "EGP"}
            </div>
            <div className="text-4xl font-serif text-white">
              {discounted} {locale === "ar" ? "ج.م" : "EGP"}
            </div>
            <div className="text-xs text-white/50 mt-1">
              {locale === "ar" ? "مع خصم الباقة" : "with bundle discount"}
            </div>
          </div>
          <button className="bg-pink text-charcoal font-bold px-8 py-4 rounded-full w-full md:w-auto hover:bg-pink-light transition-colors">
            {locale === "ar" ? "أضيفي الروتين للسلة 🛒" : "Add Routine to Cart 🛒"}
          </button>
        </div>
      </div>
    </section>
  );
}
