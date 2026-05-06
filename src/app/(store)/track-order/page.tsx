"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Search, Package, CheckCircle2, Clock, Truck, MapPin } from "lucide-react";
import { formatPriceEn } from "@/lib/utils";

export default function TrackOrderPage() {
  const { locale, t } = useLanguage();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      // In a real app, call the API. For now, simulate.
      // const res = await fetch(`/api/orders/track?id=${orderId}&email=${email}`);
      // const data = await res.json();
      // if (!data.success) throw new Error(data.error);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock data
      if (orderId === "CZ-12345" && email === "test@test.com") {
        setOrder({
          id: "CZ-12345",
          date: "2024-05-01",
          status: "shipped", // pending, processing, shipped, delivered, cancelled
          total: 1250,
          items: [
            { name: "COSRX Snail Mucin", qty: 2 },
            { name: "Beauty of Joseon Sunscreen", qty: 1 }
          ],
          shipping: { city: "Cairo", address: "123 Nile St" }
        });
      } else {
        throw new Error(locale === "ar" ? "لم يتم العثور على الطلب. يرجى التأكد من رقم الطلب والبريد الإلكتروني." : "Order not found. Please check your order ID and email.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statuses = ["pending", "processing", "shipped", "delivered"];
  const currentStatusIndex = order ? statuses.indexOf(order.status) : -1;

  return (
    <div className="min-h-screen bg-beige-light py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-pink/10 text-pink rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {locale === "ar" ? "تتبع طلبك" : "Track Your Order"}
          </h1>
          <p className="text-warm-gray text-lg">
            {locale === "ar"
              ? "أدخل رقم الطلب والبريد الإلكتروني لمعرفة حالة شحنتك."
              : "Enter your order ID and email to check your shipment status."}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  {locale === "ar" ? "رقم الطلب (CZ-XXXXX)" : "Order ID (CZ-XXXXX)"}
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="CZ-12345"
                  className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  {locale === "ar" ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:border-pink focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-xl">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg py-4 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                locale === "ar" ? "تتبع الطلب" : "Track Order"
              )}
            </button>
          </form>
        </div>

        {order && (
          <div className="bg-white rounded-3xl p-8 shadow-sm animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-beige-dark pb-6 mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-charcoal flex items-center gap-2">
                  <Package className="text-pink" />
                  {locale === "ar" ? "طلب رقم" : "Order"} #{order.id}
                </h2>
                <p className="text-warm-gray mt-1">
                  {locale === "ar" ? "تاريخ الطلب:" : "Order Date:"} {order.date}
                </p>
              </div>
              <div className="text-end">
                <p className="text-warm-gray text-sm">{locale === "ar" ? "الإجمالي" : "Total"}</p>
                <p className="text-xl font-bold text-pink-dark">
                  {formatPriceEn(order.total)} {locale === "ar" ? "ج.م" : "EGP"}
                </p>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="relative mb-12 px-4">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-beige-dark -translate-y-1/2 rounded-full hidden sm:block" />
              <div
                className="absolute top-1/2 left-4 h-1 bg-pink -translate-y-1/2 rounded-full hidden sm:block transition-all duration-500"
                style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
              />
              
              <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-0 relative z-10">
                {[
                  { id: "pending", icon: <Clock size={24} />, label: locale === "ar" ? "قيد المراجعة" : "Pending" },
                  { id: "processing", icon: <Package size={24} />, label: locale === "ar" ? "جاري التجهيز" : "Processing" },
                  { id: "shipped", icon: <Truck size={24} />, label: locale === "ar" ? "تم الشحن" : "Shipped" },
                  { id: "delivered", icon: <CheckCircle2 size={24} />, label: locale === "ar" ? "تم التوصيل" : "Delivered" },
                ].map((s, i) => {
                  const isCompleted = currentStatusIndex >= i;
                  const isCurrent = currentStatusIndex === i;
                  
                  return (
                    <div key={s.id} className="flex sm:flex-col items-center gap-4 sm:gap-3">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? "bg-pink text-white shadow-lg shadow-pink/30"
                            : "bg-white border-2 border-beige-dark text-warm-gray-light"
                        } ${isCurrent ? "scale-110 ring-4 ring-pink/20" : ""}`}
                      >
                        {s.icon}
                      </div>
                      <div className="sm:text-center">
                        <p className={`font-bold ${isCompleted ? "text-charcoal" : "text-warm-gray-light"}`}>
                          {s.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-beige-light p-6 rounded-2xl">
              <div>
                <h3 className="font-bold text-charcoal mb-3 flex items-center gap-2">
                  <Package size={18} className="text-sage" />
                  {locale === "ar" ? "محتويات الطلب" : "Order Items"}
                </h3>
                <ul className="space-y-2">
                  {order.items.map((item: any, i: number) => (
                    <li key={i} className="flex items-center justify-between text-warm-gray">
                      <span>{item.qty}x {item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-charcoal mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-sage" />
                  {locale === "ar" ? "عنوان الشحن" : "Shipping Address"}
                </h3>
                <p className="text-warm-gray">
                  {order.shipping.address}<br />
                  {order.shipping.city}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Test Note */}
        {!order && !loading && (
           <div className="text-center mt-8 p-4 bg-yellow-50 rounded-xl text-yellow-800 text-sm">
             <p><strong>Test Mode:</strong> Use Order ID <code>CZ-12345</code> and Email <code>test@test.com</code> to see a demo order.</p>
           </div>
        )}
      </div>
    </div>
  );
}
