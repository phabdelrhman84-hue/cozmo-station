import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about Cozmo Station — how we became Egypt\'s destination for premium Korean and German skincare.',
};

const milestones = [
  { year: '2022', title: 'The Idea', desc: 'Founded with a vision to bring clinically-proven, premium skincare to Egypt — without the hassle of importing.' },
  { year: '2023', title: 'First Products', desc: 'Launched with a curated selection of 20 hero products from top Korean and German brands, earning our first 1,000 customers.' },
  { year: '2024', title: 'Going Digital', desc: 'Relaunched with a world-class e-commerce platform and expanded the catalog to 100+ products.' },
  { year: '2025', title: 'Scale', desc: 'Now serving customers nationwide with next-day delivery in Cairo and Giza, and building towards the MENA region.' },
];

const stats = [
  { value: '100+', label: 'Products Curated' },
  { value: '5,000+', label: 'Happy Customers' },
  { value: '2', label: 'Countries of Origin' },
  { value: '30', label: 'Day Return Policy' },
];

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-20 bg-[#faf9f7] border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-4">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 tracking-tight leading-tight mb-6">
            The Science Behind<br />
            <span className="italic font-light">Perfect Skin</span>
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Cozmo Station was born from a simple belief: that world-class skincare should be accessible to everyone in Egypt — without compromise.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-serif text-gray-900 mb-2">{s.value}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-4">K-Beauty</p>
              <h2 className="text-3xl font-serif text-gray-900 mb-6">The Korean Approach</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Korean skincare is a philosophy, not just a routine. Built on the principles of skin health, prevention, and innovation, K-Beauty gave the world double cleansing, sheet masks, essences, and the beloved glass skin ideal. We source directly from the laboratories that pioneered these breakthroughs.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-4">German Dermatology</p>
              <h2 className="text-3xl font-serif text-gray-900 mb-6">The Science of Precision</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                When you need results you can measure, German dermatological science delivers. Decades of clinical research, strict pharmaceutical standards, and dermatologist partnerships mean every ingredient earns its place. These products don't just feel good — they work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#faf9f7] border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-4">Milestones</p>
            <h2 className="text-3xl font-serif text-gray-900">Our Journey</h2>
          </div>
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex-shrink-0 text-right w-16">
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{m.year}</span>
                </div>
                <div className="flex-shrink-0 pt-1">
                  <div className="w-2 h-2 rounded-full bg-gray-900 ring-4 ring-gray-100"></div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{m.title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Ready to Start Your Routine?</h2>
          <p className="text-gray-500 font-light mb-8">Explore our curated collection and find what works for your skin.</p>
          <Link href="/category/skincare" className="inline-block bg-gray-900 text-white px-10 py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors">
            Shop Skincare
          </Link>
        </div>
      </section>
    </div>
  );
}
