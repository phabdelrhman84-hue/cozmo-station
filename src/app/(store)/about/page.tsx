"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { Heart, ShieldCheck, Smile } from "lucide-react";

export default function AboutPage() {
  const { locale, t } = useLanguage();

  const values = [
    {
      icon: <ShieldCheck size={32} className="text-pink" />,
      title_key: "about.value1_title",
      desc_key: "about.value1",
    },
    {
      icon: <Heart size={32} className="text-pink" />,
      title_key: "about.value2_title",
      desc_key: "about.value2",
    },
    {
      icon: <Smile size={32} className="text-pink" />,
      title_key: "about.value3_title",
      desc_key: "about.value3",
    },
  ];

  return (
    <div className="min-h-screen bg-beige-light">
      {/* Hero */}
      <div className="bg-gradient-to-br from-beige to-pink-light/20 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {t("about.title")}
          </h1>
          <p className="text-lg text-warm-gray leading-relaxed">
            {locale === "ar"
              ? "نحن هنا لنقدم لك أفضل منتجات العناية بالبشرة من كوريا، لنساعدك في الحصول على بشرة صحية ومشرقة."
              : "We are here to bring you the best Korean skincare products, helping you achieve healthy, glowing skin."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          {/* Story Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-beige flex items-center justify-center text-8xl">
             🌸
          </div>
          
          {/* Story Text */}
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-6">
              {t("about.story_title")}
            </h2>
            <p className="text-warm-gray leading-relaxed text-lg mb-8">
              {t("about.story")}
            </p>
            <h2 className="text-3xl font-bold text-charcoal mb-6">
              {t("about.mission_title")}
            </h2>
            <p className="text-warm-gray leading-relaxed text-lg">
              {t("about.mission")}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-charcoal mb-4">
            {t("about.values_title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">
                {t(value.title_key)}
              </h3>
              <p className="text-warm-gray leading-relaxed">
                {t(value.desc_key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
