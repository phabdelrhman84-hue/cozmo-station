"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useProducts } from "@/hooks/useProducts";

/**
 * بحث فوري — نتائج مباشرة أثناء الكتابة من الكاش المشترك.
 * Enter → صفحة المنتجات مفلترة. مناسب للنافبار (desktop + mobile).
 */
export default function SearchBox({
  autoFocus = false,
  onNavigate,
}: {
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const { locale, t } = useLanguage();
  const { products } = useProducts();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter((p) => {
        return (
          p.name_en?.toLowerCase().includes(q) ||
          p.name_ar?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
        );
      })
      .slice(0, 6);
  }, [query, products]);

  const submit = () => {
    if (!query.trim()) return;
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    setOpen(false);
    onNavigate?.();
  };

  const go = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={boxRef} className="relative">
      <Search
        size={18}
        className="absolute top-1/2 start-4 -translate-y-1/2 text-warm-gray-light pointer-events-none"
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder={t("nav.search")}
        className="w-full ps-12 pe-10 py-3 rounded-full bg-beige border border-beige-dark focus:border-pink focus:outline-none transition-colors text-charcoal placeholder:text-warm-gray-light"
      />
      {query && (
        <button
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute top-1/2 end-4 -translate-y-1/2"
          aria-label={locale === "ar" ? "مسح" : "Clear"}
        >
          <X size={16} className="text-warm-gray" />
        </button>
      )}

      {open && query.trim().length >= 2 && (
        <div className="absolute z-50 mt-2 inset-x-0 bg-white rounded-2xl border border-beige-dark shadow-xl overflow-hidden animate-scale-in">
          {results.length > 0 ? (
            <>
              <ul className="max-h-[60vh] overflow-y-auto py-1">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={go}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-beige-light transition-colors"
                    >
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-beige-light shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            p.main_image?.startsWith("http")
                              ? p.main_image
                              : "/placeholder.png"
                          }
                          alt={locale === "ar" ? p.name_ar : p.name_en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          dir="auto"
                          className="text-sm font-medium text-charcoal truncate"
                        >
                          {locale === "ar" ? p.name_ar : p.name_en}
                        </p>
                        <p className="text-xs text-warm-gray">{p.brand}</p>
                      </div>
                      <span className="text-sm font-bold text-pink-dark shrink-0">
                        {p.price_egp.toLocaleString()}{" "}
                        {locale === "ar" ? "ج.م" : "EGP"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={submit}
                className="w-full text-center text-sm font-semibold text-pink-dark py-3 border-t border-beige-dark hover:bg-beige-light transition-colors"
              >
                {locale === "ar"
                  ? `عرض كل النتائج لـ "${query.trim()}"`
                  : `See all results for "${query.trim()}"`}
              </button>
            </>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-warm-gray">
              {locale === "ar"
                ? "لا توجد نتائج مطابقة"
                : "No matching products"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
