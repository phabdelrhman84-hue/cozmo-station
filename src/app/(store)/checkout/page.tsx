"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { shippingZones } from "@/lib/data";
import {
  User,
  MapPin,
  Truck,
  CreditCard,
  Check,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

const steps = [
  { id: 1, icon: <User size={18} /> },
  { id: 2, icon: <MapPin size={18} /> },
  { id: 3, icon: <Truck size={18} /> },
  { id: 4, icon: <CreditCard size={18} /> },
];

export default function CheckoutPage() {
  const { locale, t } = useLanguage();
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    governorate: "",
    notes: "",
  });

  const zone = shippingZones.find((z) => z.id === selectedZone);
  const shippingCost = subtotal >= 999 ? 0 : (zone?.cost_egp || 0);
  const total = subtotal + shippingCost;

  const Back = locale === "ar" ? ChevronRight : ChevronLeft;
  const Next = locale === "ar" ? ChevronLeft : ChevronRight;

  const handleUpdate = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          shipping: {
            address: formData.address,
            city: formData.city,
            governorate: formData.governorate,
            notes: formData.notes,
          },
          payment: { method: paymentMethod },
          total,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Checkout failed");
      
      setOrderPlaced(true);
      clearCart();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-light">
        <div className="text-center">
          <ShoppingBag size={64} className="text-beige-dark mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            {t("cart.empty")}
          </h1>
          <Link href="/products" className="btn-primary mt-4 inline-block">
            {t("cart.browse")}
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-light">
        <div className="text-center max-w-md mx-auto px-4 animate-scale-in">
          <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-charcoal mb-3">
            {t("checkout.success_title")}
          </h1>
          <p className="text-warm-gray mb-8">{t("checkout.success_msg")}</p>
          <Link href="/" className="btn-primary">
            {t("nav.home")}
          </Link>
        </div>
      </div>
    );
  }

  const stepLabels = [
    t("checkout.step1"),
    t("checkout.step2"),
    t("checkout.step3"),
    t("checkout.step4"),
  ];

  return (
    <div className="min-h-screen bg-beige-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-charcoal mb-8">
          {t("checkout.title")}
        </h1>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= step.id
                    ? "bg-pink text-white"
                    : "bg-beige-dark text-warm-gray"
                }`}
              >
                {currentStep > step.id ? <Check size={18} /> : step.icon}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${
                  currentStep >= step.id ? "text-charcoal" : "text-warm-gray"
                }`}
              >
                {stepLabels[i]}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-pink" : "bg-beige-dark"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <h2 className="text-xl font-bold text-charcoal mb-4">
                    {t("checkout.step1")}
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      {t("checkout.name")} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleUpdate("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      {t("checkout.email")} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleUpdate("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      {t("checkout.phone")} *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleUpdate("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <h2 className="text-xl font-bold text-charcoal mb-4">
                    {t("checkout.step2")}
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      {t("checkout.governorate")} *
                    </label>
                    <select
                      value={formData.governorate}
                      onChange={(e) => {
                        handleUpdate("governorate", e.target.value);
                        // Find the zone for this governorate
                        const foundZone = shippingZones.find((z) =>
                          locale === "ar"
                            ? z.governorates_ar.includes(e.target.value)
                            : z.governorates_en.includes(e.target.value)
                        );
                        if (foundZone) setSelectedZone(foundZone.id);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="">
                        {locale === "ar"
                          ? "اختر المحافظة"
                          : "Select Governorate"}
                      </option>
                      {shippingZones.flatMap((z) =>
                        (locale === "ar"
                          ? z.governorates_ar
                          : z.governorates_en
                        ).map((gov) => (
                          <option key={gov} value={gov}>
                            {gov}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      {t("checkout.city")} *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleUpdate("city", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      {t("checkout.address")} *
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleUpdate("address", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      {t("checkout.notes")}
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleUpdate("notes", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Shipping Method */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <h2 className="text-xl font-bold text-charcoal mb-4">
                    {t("checkout.step3")}
                  </h2>
                  {zone ? (
                    <div className="p-5 rounded-xl bg-beige-light border-2 border-pink">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-charcoal">
                            {locale === "ar" ? zone.name_ar : zone.name_en}
                          </p>
                          <p className="text-sm text-warm-gray mt-1">
                            {locale === "ar"
                              ? `التوصيل خلال ${zone.delivery_days} أيام`
                              : `Delivery in ${zone.delivery_days} days`}
                          </p>
                        </div>
                        <div className="text-end">
                          {subtotal >= 999 ? (
                            <div>
                              <span className="text-sm text-warm-gray line-through">
                                {zone.cost_egp} {locale === "ar" ? "ج.م" : "EGP"}
                              </span>
                              <p className="text-sage font-bold">
                                {locale === "ar" ? "مجاني" : "Free"}
                              </p>
                            </div>
                          ) : (
                            <p className="font-bold text-charcoal">
                              {zone.cost_egp}{" "}
                              {locale === "ar" ? "ج.م" : "EGP"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-warm-gray">
                      {locale === "ar"
                        ? "اختر المحافظة أولاً"
                        : "Please select a governorate first"}
                    </p>
                  )}
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-fade-in">
                  <h2 className="text-xl font-bold text-charcoal mb-4">
                    {t("checkout.step4")}
                  </h2>
                  {["cod", "paypal"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`w-full p-5 rounded-xl border-2 text-start transition-all ${
                        paymentMethod === method
                          ? "border-pink bg-pink/5"
                          : "border-beige-dark hover:border-pink/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === method
                              ? "border-pink"
                              : "border-beige-dark"
                          }`}
                        >
                          {paymentMethod === method && (
                            <div className="w-2.5 h-2.5 rounded-full bg-pink" />
                          )}
                        </div>
                        <span className="font-bold text-charcoal">
                          {method === "cod"
                            ? t("checkout.cod")
                            : t("checkout.paypal")}
                        </span>
                      </div>
                      {method === "cod" && (
                        <p className="text-sm text-warm-gray mt-2 ms-8">
                          {locale === "ar"
                            ? "ادفع نقداً عند استلام طلبك"
                            : "Pay cash when you receive your order"}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-beige-dark">
                {currentStep > 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Back size={18} />
                    {t("checkout.back")}
                  </button>
                ) : (
                  <div />
                )}
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="btn-primary flex items-center gap-2"
                  >
                    {t("checkout.next")}
                    <Next size={18} />
                  </button>
                ) : (
                  <div className="flex flex-col items-end gap-2">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="btn-primary text-lg px-8 flex items-center justify-center min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        t("checkout.place_order")
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-charcoal mb-4">
                {t("checkout.order_summary")}
              </h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-lg bg-beige flex-shrink-0 flex items-center justify-center text-lg">
                      🧴
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {locale === "ar"
                          ? item.product.name_ar
                          : item.product.name_en}
                      </p>
                      <p className="text-xs text-warm-gray">
                        x{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-charcoal">
                      {(
                        item.product.price_egp * item.quantity
                      ).toLocaleString()}{" "}
                      {locale === "ar" ? "ج.م" : "EGP"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-beige-dark pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">{t("cart.subtotal")}</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString()}{" "}
                    {locale === "ar" ? "ج.م" : "EGP"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">{t("cart.shipping")}</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-sage">
                        {locale === "ar" ? "مجاني" : "Free"}
                      </span>
                    ) : (
                      `${shippingCost.toLocaleString()} ${
                        locale === "ar" ? "ج.م" : "EGP"
                      }`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-beige-dark">
                  <span className="text-charcoal">{t("cart.total")}</span>
                  <span className="text-pink-dark">
                    {total.toLocaleString()}{" "}
                    {locale === "ar" ? "ج.م" : "EGP"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
