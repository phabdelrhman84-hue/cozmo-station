"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.products") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-sage text-white text-center py-2 text-sm font-medium">
        {locale === "ar"
          ? "✨ شحن مجاني للطلبات فوق ٩٩٩ ج.م ✨"
          : "✨ Free shipping on orders over 999 EGP ✨"}
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-md py-3"
            : "bg-white/95 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-sage flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                C
              </div>
              <span className="text-xl font-bold text-charcoal tracking-tight hidden sm:block">
                {locale === "ar" ? "كوزمو ستيشن" : "Cozmo Station"}
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-warm-gray hover:text-pink-dark transition-colors font-medium relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-pink group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-beige transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="text-charcoal" />
              </button>

              {/* Language Switcher */}
              <button
                onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-beige-dark hover:border-pink transition-colors text-sm font-medium"
              >
                <Globe size={16} />
                <span>{locale === "ar" ? "EN" : "عربي"}</span>
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-full hover:bg-beige transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={22} className="text-charcoal" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -end-1 w-5 h-5 bg-pink text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden p-2 rounded-full hover:bg-beige transition-colors"
                aria-label="Menu"
              >
                {mobileMenu ? (
                  <X size={22} className="text-charcoal" />
                ) : (
                  <Menu size={22} className="text-charcoal" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar - Expandable */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              searchOpen ? "max-h-20 mt-4 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative">
              <Search
                size={18}
                className="absolute top-1/2 start-4 -translate-y-1/2 text-warm-gray-light"
              />
              <input
                type="text"
                placeholder={t("nav.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full ps-12 pe-4 py-3 rounded-full bg-beige border border-beige-dark focus:border-pink focus:outline-none transition-colors text-charcoal placeholder:text-warm-gray-light"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenu ? "max-h-80 border-t border-beige-dark" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 space-y-1 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className="block py-3 px-4 rounded-lg text-charcoal hover:bg-beige hover:text-pink-dark transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
