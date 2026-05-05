import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  title: string;
  price: number;
  origin: string;
  images?: Array<{ asset: { _ref: string } }>;
}

// Fetch products from Sanity
async function getFeaturedProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    price,
    origin,
    images
  }`;
  
  try {
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch bundles
async function getBundleProducts() {
  // If we had a specific "bundle" category, we would use it here.
  // For now, let's fetch products that might have bundle in title or just get a subset
  const query = `*[_type == "product" && title match "*Bundle*"] | order(_createdAt desc) {
    _id,
    title,
    price,
    origin,
    images
  }`;
  
  try {
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const bundleProducts = await getBundleProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-[#faf9f7]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          {/* Subtle gradient orb 1 */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#e8e4db] to-transparent opacity-60 blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
          {/* Subtle gradient orb 2 */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-[#f0eae1] to-transparent opacity-60 blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200/50 bg-white/40 backdrop-blur-md mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-green-500/80"></span>
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
            <Link 
              href="/shop" 
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-widest hover:bg-black hover:shadow-xl transition-all duration-300"
            >
              Shop the Routine
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="flex items-center justify-center px-8 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 text-sm font-medium uppercase tracking-widest hover:bg-white transition-all duration-300"
            >
              Our Philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* Category Navigation Sections */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/category/skincare" className="group relative h-64 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[#e8e4db] transition-transform duration-700 group-hover:scale-105"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-serif text-gray-900 mb-2">Skincare</h3>
                <span className="text-sm font-medium uppercase tracking-widest text-gray-600 group-hover:text-gray-900 transition-colors">Explore Collection &rarr;</span>
              </div>
            </Link>
            <Link href="/category/haircare" className="group relative h-64 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[#f0eae1] transition-transform duration-700 group-hover:scale-105"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-serif text-gray-900 mb-2">Haircare</h3>
                <span className="text-sm font-medium uppercase tracking-widest text-gray-600 group-hover:text-gray-900 transition-colors">Explore Collection &rarr;</span>
              </div>
            </Link>
            <Link href="/category/exclusive-bundles" className="group relative h-64 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[#e3e1df] transition-transform duration-700 group-hover:scale-105"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-serif text-gray-900 mb-2">Exclusive Bundles</h3>
                <span className="text-sm font-medium uppercase tracking-widest text-gray-600 group-hover:text-gray-900 transition-colors">Shop Sets &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight mb-2">Featured Collection</h2>
              <p className="text-sm tracking-widest uppercase text-gray-400 font-semibold">Scientifically Proven Results</p>
            </div>
            <Link 
              href="/category/skincare" 
              className="group flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors"
            >
              View Skincare
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                    imageUrl={product.images && product.images.length > 0 ? urlFor(product.images[0]).width(600).height(750).url() : undefined}
                    index={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Curating Excellence</h3>
              <p className="text-gray-500 text-center max-w-md">Our skincare experts are currently updating our featured collection. Check back soon for new arrivals.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bundles & Sets Section */}
      <section className="py-24 bg-[#faf9f7] border-t border-gray-100 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight mb-2">Bundles & Sets</h2>
              <p className="text-sm tracking-widest uppercase text-gray-500 font-semibold">Complete the Routine & Save</p>
            </div>
            <Link 
              href="/category/exclusive-bundles" 
              className="group flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors"
            >
              View All Bundles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                    imageUrl={product.images && product.images.length > 0 ? urlFor(product.images[0]).width(600).height(750).url() : undefined}
                    index={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 border-dashed shadow-sm">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Exclusive Sets Coming Soon</h3>
              <p className="text-gray-500 text-center max-w-md">We are putting together the perfect routines. Check back soon for exclusive bundles.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
