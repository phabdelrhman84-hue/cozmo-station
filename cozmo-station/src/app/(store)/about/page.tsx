import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 bg-[#faf9f7]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">Our Philosophy</h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
            Cozmo Station brings together the pinnacle of global skincare innovations.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg prose-gray mx-auto font-light text-gray-600 leading-relaxed">
            <p>
              At Cozmo Station, we believe that achieving perfect skin is a science. That is why we have meticulously curated a collection that represents the very best of two worlds: <strong>Korean innovation and German dermatological precision</strong>.
            </p>
            <h2 className="text-3xl font-serif text-gray-900 mt-12 mb-6">The Best of K-Beauty</h2>
            <p>
              Korean skincare is renowned globally for its preventative approach, gentle formulations, and groundbreaking ingredients. We source directly from top-tier Korean laboratories to bring you products that hydrate, nourish, and protect your skin barrier.
            </p>
            <h2 className="text-3xl font-serif text-gray-900 mt-12 mb-6">German Dermatological Science</h2>
            <p>
              When it comes to treating specific skin concerns with clinical efficacy, German science is unparalleled. We feature brands that are backed by decades of research, stringent clinical testing, and dermatologist approval.
            </p>
            <div className="mt-12 p-8 bg-gray-50 rounded-2xl text-center">
              <h3 className="text-2xl font-serif text-gray-900 mb-4">Experience the Synergy</h3>
              <p className="mb-6">
                Discover the transformative power of combining these elite skincare philosophies.
              </p>
              <Link href="/category/skincare" className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors">
                Shop Our Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
