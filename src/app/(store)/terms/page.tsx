"use client";

import { useLanguage } from "@/hooks/useLanguage";
import ReactMarkdown from "react-markdown";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-beige-light py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-8 text-center">
            {t("terms.title")}
          </h1>
          <div className="prose prose-pink prose-lg max-w-none text-warm-gray prose-headings:text-charcoal prose-strong:text-charcoal">
            <ReactMarkdown>{t("terms.content")}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
