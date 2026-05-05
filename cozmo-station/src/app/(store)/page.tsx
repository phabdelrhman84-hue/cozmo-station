import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import TrustBar from '@/components/TrustBar';
import ShopByConcern from '@/components/ShopByConcern';
import BrandLogoBar from '@/components/BrandLogoBar';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  title: string;
  slug?: { current: string };
  price: number;
  origin: string;
  images?: Array<{ asset: { _ref: string } }>;
}

async function getFeaturedProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc)[0...8] {
    _id, title, slug, price, origin, images
  }`;
  try { return await client.fetch(query) || []; }
  catch { return []; }
}

async function getBundleProducts() {
  const query = `*[_type == "product" && title match "*Bundle*"] | order(_createdAt desc)[0...4] {
    _id, title, slug, price, origin, images
  }`;
  try { return await client.fetch(query) || []; }
  catch { return []; }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const bundleProducts = await getBundleProducts();

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-[#faf9f7]">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#e8e4db] to-transparent opacity-60 blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-[#f0eae1] to-transparent opacity-60 blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200/50 bg-white/40 backdrop-blur-md mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-green-500/80" />
            <span className="text-xs font-medium tracking-widest text-gray-600 uppercase">Curated Excellence</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 tracking-tight leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            The Science of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 italic font-light">
              Perfect Skin
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-light tracking-wide mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Discover <span className="font-medium text-gray-700">Cozmo Station</span>. The ultimate fusion of advanced Korean formulas and meticulous German dermatological science.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link href="/category/skincare" className="group flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-widest hover:bg-black hover:shadow-xl transition-all duration-300">
              Shop the Routine
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/our-story" className="flex items-center justify-center px-8 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 text-sm font-medium uppercase tracking-widest hover:bg-white transition-all duration-300">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ──────────────────────────────────── */}
      <TrustBar />

      {/* ── Category Cards ─────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">Collections</p>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/category/skincare', label: 'Skincare', sub: 'Korean & German Science', bg: 'bg-[#e8e4db]' },
              { href: '/category/haircare', label: 'Haircare', sub: 'Premium Treatments', bg: 'bg-[#f0eae1]' },
              { href: '/category/exclusive-bundles', label: 'Exclusive Bundles', sub: 'Complete & Save', bg: 'bg-[#e3e1df]' },
            ].map((cat) => (
              <Link key={cat.href} href={cat.href} className={`group relative h-64 ${cat.bg} rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-xl`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gray-900/5 transition-opacity duration-500" />
                <h3 className="text-2xl font-serif text-gray-900 mb-2 relative z-10">{cat.label}</h3>
                <p className="text-xs font-medium uppercase tracking-widest text-gray-500 relative z-10">{cat.sub}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gray-700 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 relative z-10">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Concern ────────────────────────────── */}
      <ShopByConcern />

      {/* ── Featured Products ──────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6 gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">New Arrivals</p>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight">Featured Collection</h2>
            </div>
            <Link href="/category/skincare" className="group flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
              {featuredProducts.map((product: Product, index: number) => {
                const displayBrand = product.origin === 'korean' ? 'K-Beauty' : product.origin === 'german' ? 'German Science' : 'Cozmo Station';
                return (
                  <ProductCard
                    key={product._id}
                    brand={displayBrand}
                    title={product.title}
                    price={product.price}
                    slug={product.slug?.current}
                    imageUrl={product.images?.[0] ? urlFor(product.images[0]).width(600).height(750).url() : undefined}
                    index={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <span className="text-3xl mb-4">✨</span>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Curating Excellence</h3>
              <p className="text-gray-500 text-center max-w-md text-sm">Our skincare experts are updating our featured collection. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Brand Logo Marquee ─────────────────────────── */}
      <BrandLogoBar />

      {/* ── Bundles & Sets ─────────────────────────────── */}
      <section className="py-24 bg-[#faf9f7] border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6 gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">Higher Value</p>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight">Bundles & Sets</h2>
            </div>
            <Link href="/category/exclusive-bundles" className="group flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors">
              View All Bundles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {bundleProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
              {bundleProducts.map((product: Product, index: number) => {
                const displayBrand = product.origin === 'korean' ? 'K-Beauty' : product.origin === 'german' ? 'German Science' : 'Cozmo Station';
                return (
                  <ProductCard
                    key={product._id}
                    brand={displayBrand}
                    title={product.title}
                    price={product.price}
                    slug={product.slug?.current}
                    imageUrl={product.images?.[0] ? urlFor(product.images[0]).width(600).height(750).url() : undefined}
                    index={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
              <span className="text-3xl mb-4">🎁</span>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Exclusive Sets Coming Soon</h3>
              <p className="text-gray-500 text-center max-w-md text-sm">We are putting together the perfect routines. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
