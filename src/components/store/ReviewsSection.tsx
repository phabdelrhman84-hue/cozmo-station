"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  const { locale } = useLanguage();

  const reviews = [
    {
      id: 1,
      name: locale === "ar" ? "نورهان أحمد" : "Nourhan Ahmed",
      date: locale === "ar" ? "منذ 3 أيام" : "3 days ago",
      verified: true,
      rating: 5,
      title: locale === "ar" ? "غيّرت بشرتي في شهر واحد بس!" : "Changed my skin in just one month!",
      text: locale === "ar" 
        ? "والله كنت متشككة في البداية بس جربت السيروم بتاع COSRX ومش مصدقة الفرق. البشرة بقت مشدودة ومضيئة وحب الشباب قل جداً."
        : "I was skeptical at first but tried the COSRX serum and can't believe the difference. My skin is tight, glowing, and acne is significantly reduced.",
      product: "COSRX Snail 96 Essence",
      emojis: ["✨", "🌸"],
      avatarColor: "bg-pink-light/30",
      avatarEmoji: "🧕",
    },
    {
      id: 2,
      name: locale === "ar" ? "مريم إبراهيم" : "Mariam Ibrahim",
      date: locale === "ar" ? "منذ أسبوع" : "1 week ago",
      verified: true,
      rating: 5,
      title: locale === "ar" ? "شحن سريع جداً والمنتجات أصيلة 💯" : "Very fast shipping and authentic products 💯",
      text: locale === "ar"
        ? "الطلب وصل في يومين وكل المنتجات معها أكواد للتحقق من الأصالة. السعر معقول والتغليف كان حلو جداً. هشتري تاني أكيد."
        : "The order arrived in 2 days and all products have authenticity codes. The price is reasonable and packaging was very nice. Will definitely buy again.",
      product: "Beauty of Joseon Sun + SOME BY MI Toner",
      emojis: [],
      avatarColor: "bg-sage-light/30",
      avatarEmoji: "👩",
    },
    {
      id: 3,
      name: locale === "ar" ? "سارة محمود" : "Sarah Mahmoud",
      date: locale === "ar" ? "منذ أسبوعين" : "2 weeks ago",
      verified: true,
      rating: 5,
      title: locale === "ar" ? "ماسك الشعر ده معجزة حقيقية" : "This hair mask is a real miracle",
      text: locale === "ar"
        ? "شعري كان تالف جداً من الصبغة. بعد استخدام ماسك Mise En Scene 3 مرات بس، بقى ناعم ولمّاع زي ما كانش اتصبغ أصلاً!"
        : "My hair was very damaged from dyeing. After using the Mise En Scene mask just 3 times, it became soft and shiny as if it was never dyed!",
      product: "Mise En Scene Hair Mask",
      emojis: [],
      avatarColor: "bg-blue-100",
      avatarEmoji: "👩‍🦱",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-beige-light/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-sage font-bold tracking-widest uppercase text-xs mb-3">
            {locale === "ar" ? "آراء عملاءنا" : "Customer Reviews"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
            {locale === "ar" ? (
              <>هم قالوا <em className="text-pink not-italic font-serif">إيه؟</em></>
            ) : (
              <>What are they <em className="text-pink not-italic font-serif">saying?</em></>
            )}
          </h2>
          <p className="text-warm-gray text-lg">
            {locale === "ar"
              ? "تقييمات حقيقية من عملاء حقيقيين — بدون تعديل"
              : "Real reviews from real customers — unedited"}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/5 mb-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="text-center md:w-1/3">
            <div className="text-7xl font-serif text-charcoal leading-none">4.9</div>
            <div className="flex items-center justify-center gap-1 text-warning my-3 text-2xl">
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
            </div>
            <div className="text-warm-gray text-sm">
              {locale === "ar" ? "من 12,450 تقييم" : "Based on 12,450 reviews"}
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-3">
            {[
              { stars: 5, pct: 87 },
              { stars: 4, pct: 10 },
              { stars: 3, pct: 2 },
              { stars: 2, pct: 1 },
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center gap-4 text-sm">
                <span className="w-8 text-warm-gray text-left whitespace-nowrap">{bar.stars} ★</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sage to-pink rounded-full"
                    style={{ width: `${bar.pct}%` }}
                  ></div>
                </div>
                <span className="w-10 text-warm-gray">{bar.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${review.avatarColor}`}
                >
                  {review.avatarEmoji}
                </div>
                <div>
                  <div className="font-bold text-charcoal">{review.name}</div>
                  <div className="text-xs text-warm-gray flex items-center gap-1">
                    {review.date}
                    <span className="mx-1">·</span>
                    <span className="text-sage font-semibold flex items-center">
                      ✓ {locale === "ar" ? "مشتري موثق" : "Verified Buyer"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 text-warning text-sm mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <h4 className="font-bold text-charcoal mb-2">{review.title}</h4>
              <p className="text-sm text-warm-gray leading-relaxed font-light">
                {review.text}
              </p>

              {review.emojis.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.emojis.map((emoji, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-xl bg-sage-light/20 flex items-center justify-center text-2xl"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-warm-gray">
                {locale === "ar" ? "المنتج: " : "Product: "} {review.product}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
