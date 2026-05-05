import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs — Frequently Asked Questions',
  description: 'Answers to the most common questions about Cozmo Station shipping, returns, Korean skincare, and German skincare.',
};

const faqs = [
  { q: 'What makes Korean skincare different?', a: 'Korean skincare focuses on prevention, gentle layering, and cutting-edge ingredients like Centella Asiatica, Snail Mucin, and Niacinamide. The philosophy is about achieving a healthy skin barrier first, then addressing specific concerns.' },
  { q: 'How is German skincare different from K-Beauty?', a: 'German dermatological brands like ISDIN and Eucerin are rooted in clinical science and pharmaceutical-grade formulations. They focus on efficacy-proven active ingredients with rigorous clinical testing, ideal for sensitive or problematic skin.' },
  { q: 'How long does delivery take in Egypt?', a: 'Orders within Cairo and Giza are typically delivered next business day. Other governorates take 2–5 business days. We ship nationwide.' },
  { q: 'Do you offer free shipping?', a: 'Yes — free delivery is available on all orders over 500 EGP. Orders below this threshold have a flat shipping fee.' },
  { q: 'Are your products 100% authentic?', a: 'Absolutely. All products sold on Cozmo Station are sourced directly from authorized brand distributors. We guarantee authenticity on every single item.' },
  { q: 'Can I return a product?', a: 'Yes. We accept returns within 30 days of purchase, provided the item is unused and in its original packaging. Visit our Return Policy page or contact us to initiate a return.' },
  { q: 'How do I know which products are right for my skin type?', a: 'Reach our skincare consultants via WhatsApp for a free personalized routine recommendation. We consider your skin type, concerns, budget, and lifestyle.' },
  { q: 'Can I track my order?', a: 'Yes. Once dispatched, you will receive a tracking link via email. You can also use our Track Your Order page and enter your order ID and email.' },
  { q: 'Do you ship internationally?', a: 'We currently serve Egypt nationwide. International shipping is coming soon — follow our social channels for updates.' },
  { q: 'Do your products contain harmful chemicals?', a: 'All products are dermatologist-tested and comply with EU or Korean cosmetic safety standards. Ingredient lists are available on each product page.' },
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="pt-24 pb-16 bg-[#faf9f7] border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-4">Support</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-500 font-light">Everything you need to know about our products, shipping, and philosophy.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-6 cursor-pointer">
                <summary className="flex justify-between items-center gap-4 list-none">
                  <span className="text-base font-medium text-gray-900">{faq.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 group-open:bg-gray-900 group-open:border-gray-900 group-open:text-white transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-45 transition-transform duration-200">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm text-gray-500 leading-relaxed font-light pr-10">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-16 bg-[#faf9f7] rounded-2xl p-8 text-center border border-gray-100">
            <p className="text-base font-serif text-gray-900 mb-2">Still have questions?</p>
            <p className="text-sm text-gray-500 mb-6">Our team is happy to help with personalised advice.</p>
            <a href="/contact" className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
