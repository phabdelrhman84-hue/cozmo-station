"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const { locale, t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-beige-light">
      <div className="bg-gradient-to-br from-beige to-pink-light/20 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-warm-gray leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              {locale === "ar" ? "معلومات التواصل" : "Contact Information"}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0 text-pink">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-lg">
                    {locale === "ar" ? "البريد الإلكتروني" : "Email"}
                  </h3>
                  <p className="text-warm-gray mt-1">support@cozmo-station.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0 text-pink">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-lg">
                    {locale === "ar" ? "الهاتف" : "Phone"}
                  </h3>
                  <p className="text-warm-gray mt-1">+20 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0 text-pink">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-lg">
                    {locale === "ar" ? "العنوان" : "Address"}
                  </h3>
                  <p className="text-warm-gray mt-1">
                    {locale === "ar"
                      ? "القاهرة، مصر (متجر إلكتروني فقط)"
                      : "Cairo, Egypt (Online Store Only)"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-8 bg-beige rounded-2xl">
              <h3 className="font-bold text-charcoal text-xl mb-4">
                {locale === "ar" ? "ساعات العمل" : "Working Hours"}
              </h3>
              <ul className="space-y-2 text-warm-gray">
                <li className="flex justify-between">
                  <span>{locale === "ar" ? "الأحد - الخميس:" : "Sunday - Thursday:"}</span>
                  <span>10:00 AM - 06:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>{locale === "ar" ? "الجمعة - السبت:" : "Friday - Saturday:"}</span>
                  <span>{locale === "ar" ? "مغلق" : "Closed"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              {locale === "ar" ? "أرسل رسالة" : "Send a Message"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors bg-beige-light/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors bg-beige-light/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors bg-beige-light/50 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status !== "idle"}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  status === "success"
                    ? "bg-sage text-white"
                    : "bg-pink text-white hover:bg-pink-dark"
                }`}
              >
                {status === "submitting" ? (
                  <span className="animate-pulse">...</span>
                ) : status === "success" ? (
                  <>
                    <Check size={20} />
                    {t("contact.sent")}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t("contact.send")}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
