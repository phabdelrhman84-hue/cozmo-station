"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Camera,
  MessageCircle,
  Globe,
  Send,
  Heart,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const { locale, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-white/80 relative">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-pink-dark to-sage py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            {t("footer.newsletter")}
          </h3>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            {t("footer.newsletter_desc")}
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer.email_placeholder")}
              className="flex-1 px-5 py-3 rounded-full bg-white/20 backdrop-blur text-white placeholder:text-white/60 border border-white/30 focus:border-white focus:outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-pink-dark font-bold rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              {subscribed ? "✓" : <Send size={18} />}
              <span className="hidden sm:inline">
                {subscribed
                  ? locale === "ar"
                    ? "تم!"
                    : "Done!"
                  : t("footer.subscribe")}
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-sage flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="text-lg font-bold text-white">
                {locale === "ar" ? "كوزمو ستيشن" : "Cozmo Station"}
              </span>
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              {t("footer.about")}
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink transition-colors"
              >
                <Camera size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink transition-colors"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink transition-colors"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">
              {t("footer.links")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: t("nav.home") },
                { href: "/products", label: t("nav.products") },
                { href: "/track-order", label: locale === "ar" ? "تتبع الطلب" : "Track Order" },
                { href: "/about", label: t("nav.about") },
                { href: "/contact", label: t("nav.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-pink transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/privacy-policy", label: t("footer.privacy") },
                { href: "/terms", label: t("footer.terms") },
                { href: "/returns", label: t("footer.returns") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-pink transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()}{" "}
            {locale === "ar" ? "كوزمو ستيشن" : "Cozmo Station"}.{" "}
            {t("footer.rights")}
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-pink fill-pink" /> in
            Egypt
          </p>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 end-6 w-10 h-10 bg-pink text-white rounded-full shadow-lg hover:bg-pink-dark transition-all hover:scale-110 flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
